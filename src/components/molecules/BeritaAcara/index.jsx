import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FaCheck, FaEdit } from "react-icons/fa";
import Card from "@components/atoms/Card";
import supabase from "@/client/supabase";
import moment from "moment-timezone";
import "moment/locale/id"; // Import locale Indonesian

const BeritaAcara = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

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
        setUserId(decodedToken.id); // Set user ID dari token
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

      console.log("Waktu sekarang:", currentTime);
      console.log("User ID:", userId);
      console.log("Hari ini dalam bahasa Indonesia:", currentDayInIndonesian);

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

      console.log("Data dari Supabase:", data);

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
      console.log("Hari ini dalam bahasa Inggris:", currentDayInEnglish);

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
        return currentTimeObject.isBetween(
          startTimeObject,
          endTimeObject,
          null,
          "[]"
        );
      });

      console.log("Data yang difilter:", filteredData);

      setClasses(filteredData);
      setFilteredClasses(filteredData);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
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
                <h2 className="text-lg font-semibold">
                  {item.matakuliah.nama}
                </h2>
                <p className="text-[12px]">{item.matakuliah.kode}</p>
              </div>
              {item.studentPresent ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaEdit className="text-blue-500" />
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
    </div>
  );
};

export default BeritaAcara;
