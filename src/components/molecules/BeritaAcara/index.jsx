import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FaCheck, FaEdit, FaBarcode } from "react-icons/fa";
import Card from "@components/atoms/Card";
import supabase from "@/client/supabase"; // Ensure this points to the correct Supabase client
import moment from "moment-timezone";
import "moment/locale/id"; // Import locale Indonesian
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const BeritaAcara = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [attendanceOpened, setAttendanceOpened] = useState(() => {
    // Load attendanceOpened status from localStorage
    const savedStatus = localStorage.getItem("attendanceOpened");
    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  const dayMappingToEnglish = {
    Senin: "Monday",
    Selasa: "Tuesday",
    Rabu: "Wednesday",
    Kamis: "Thursday",
    Jumat: "Friday",
    Sabtu: "Saturday",
    Minggu: "Sunday",
  };

  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Set user ID from token
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchClasses(userId);
      const intervalId = setInterval(() => fetchClasses(userId), 60000); // Update every minute
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [userId]);

  const fetchClasses = async (userId) => {
    try {
      const currentTime = moment().tz("Asia/Jakarta").format("HH:mm:ss"); // Get current time in HH:mm:ss format
      moment.locale("id"); // Set locale to Indonesian
      const currentDayInIndonesian = moment().tz("Asia/Jakarta").format("dddd");

      const { data, error } = await supabase
        .from("jadwalkelas")
        .select(
          `
          jadwal_kelas_id,
          user_id,
          mata_kuliah_id,
          hari,
          waktu_mulai,
          waktu_selesai,
          ruang_id,
          matakuliah (
            kode,
            nama,
            semester,
            sks
          ),
          ruangkelas:ruang_id (
            nama
          )
        `
        )
        .eq("user_id", userId);

      if (error) {
        console.error("Gagal mengambil data jadwal kelas:", error.message);
        return;
      }

      if (data.length === 0) {
        console.warn("Tidak ada data yang sesuai dengan kriteria.");
        setClasses([]);
        setFilteredClasses([]);
        return;
      }

      // Translate day from Indonesian to English for processing
      const translatedData = data.map((item) => ({
        ...item,
        hariEnglish: dayMappingToEnglish[item.hari] || item.hari,
      }));

      // Get current day in English
      moment.locale("en"); // Set locale to English
      const currentDayInEnglish = moment().tz("Asia/Jakarta").format("dddd");

      // Filter data based on current day and time
      const currentTimeObject = moment.tz(
        `1970-01-01T${currentTime}`,
        "Asia/Jakarta"
      );
      const filteredData = translatedData.filter((item) => {
        if (item.hariEnglish !== currentDayInEnglish) return false;
        const startTimeObject = moment.tz(
          `1970-01-01T${item.waktu_mulai}`,
          "Asia/Jakarta"
        );
        const endTimeObject = moment.tz(
          `1970-01-01T${item.waktu_selesai}`,
          "Asia/Jakarta"
        );
        // Check if attendance is opened or class time is not yet over
        return currentTimeObject.isBetween(
          startTimeObject,
          endTimeObject,
          null,
          "[]"
        );
      });

      // Update attendanceOpened state to reset after class time
      const updatedAttendanceOpened = { ...attendanceOpened };
      filteredData.forEach((item) => {
        const endTimeObject = moment.tz(
          `1970-01-01T${item.waktu_selesai}`,
          "Asia/Jakarta"
        );
        if (currentTimeObject.isAfter(endTimeObject)) {
          delete updatedAttendanceOpened[item.jadwal_kelas_id];
        }
      });

      setAttendanceOpened(updatedAttendanceOpened);
      localStorage.setItem(
        "attendanceOpened",
        JSON.stringify(updatedAttendanceOpened)
      );
      setClasses(filteredData);
      setFilteredClasses(filteredData);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendance = (
    jadwalKelasId,
    mataKuliahId,
    hari,
    waktuMulai,
    waktuSelesai,
    ruangId
  ) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        MySwal.fire({
          title: "Buka Acara",
          text: "Apakah Anda yakin ingin membuka presensi?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, buka!",
          cancelButtonText: "Tidak, batal",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { error } = await supabase.from("riwayatpresensi").insert([
              {
                user_id: userId,
                jadwal_kelas_id: jadwalKelasId,
                latitude: latitude,
                longitude: longitude,
              },
            ]);

            if (error) {
              Swal.fire("Gagal!", "Gagal menyimpan riwayat presensi.", "error");
            } else {
              const updatedAttendanceOpened = {
                ...attendanceOpened,
                [jadwalKelasId]: true,
              };
              setAttendanceOpened(updatedAttendanceOpened);
              // Save the updated attendanceOpened state to localStorage
              localStorage.setItem(
                "attendanceOpened",
                JSON.stringify(updatedAttendanceOpened)
              );

              // Show QR code or message
              MySwal.fire({
                title: "Barcode Presensi",
                html: `<div style="display: flex; justify-content: center; align-items: center;">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${jadwalKelasId}" alt="barcode" />
                       </div>`,
                confirmButtonText: "Tutup",
              });
            }
          }
        });
      });
    } else {
      Swal.fire(
        "Gagal!",
        "Geolocation tidak didukung oleh browser Anda.",
        "error"
      );
    }
  };

  const handleShowBarcode = (jadwalKelasId) => {
    MySwal.fire({
      title: "Barcode Presensi",
      html: `<div style="display: flex; justify-content: center; align-items: center;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${jadwalKelasId}" alt="barcode" />
             </div>`,
      confirmButtonText: "Tutup",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
      {filteredClasses.length === 0 ? (
        <div className="flex items-center justify-center h-[20rem]">
          <p>Belum ada jadwal kelas yang tersedia.</p>
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((item, index) => (
            <Card
              key={index}
              className={`p-4 flex justify-between ${
                item.studentPresent ? "bg-green-100" : ""
              } card`}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-[16px] w-[80%] font-semibold">
                    {item.matakuliah.nama}
                  </h2>
                  <p className="text-[11px] mt-2">{item.matakuliah.kode}</p>
                </div>
                {item.studentPresent ? (
                  <FaCheck className="text-green-500 " />
                ) : attendanceOpened[item.jadwal_kelas_id] ? (
                  <FaBarcode
                    size={28}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleShowBarcode(item.jadwal_kelas_id)}
                  />
                ) : (
                  <FaEdit
                    size={24}
                    className="text-blue-500 cursor-pointer"
                    onClick={() =>
                      handleAttendance(
                        item.jadwal_kelas_id,
                        item.mata_kuliah_id,
                        item.hari,
                        item.waktu_mulai,
                        item.waktu_selesai,
                        item.ruang_id
                      )
                    }
                  />
                )}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <p className="flex items-end">{item.ruangkelas.nama}</p>
                <div>
                  <div className="flex flex-col text-right">
                    <p>{item.hari}</p>
                    <p className="text-[12px]">
                      {item.waktu_mulai} s/d {item.waktu_selesai}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeritaAcara;
