import { useState, useEffect, useRef } from "react";
import { FaQrcode, FaCheck } from "react-icons/fa";
import Card from "@components/atoms/Card";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import supabase from "@/client/supabase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Tour from "@components/atoms/Tour";

const MySwal = withReactContent(Swal);

const PresensiMahasiswa = () => {
  const [classes, setClasses] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanIndex, setScanIndex] = useState(null);
  const [userId, setUserId] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchStudentCourses(userId); // Fetch the courses the student is enrolled in
      fetchAttendanceStatus(userId);
    }
  }, [userId]);

  const fetchStudentCourses = async (userId) => {
    try {
      // Ambil profil_mahasiswa_id dari profil_mahasiswa
      const { data: mahasiswaData, error: mahasiswaError } = await supabase
        .from("profil_mahasiswa")
        .select("profil_mahasiswa_id")
        .eq("user_id", userId)
        .single();

      if (mahasiswaError) {
        console.error(
          "Gagal mengambil profil mahasiswa:",
          mahasiswaError.message
        );
        return;
      }

      const profilMahasiswaId = mahasiswaData.profil_mahasiswa_id;

      // Ambil mata_kuliah_id dari mahasiswa_matakuliah
      const { data: coursesData, error: coursesError } = await supabase
        .from("mahasiswamatakuliah")
        .select(
          `
          mata_kuliah_id,
          matakuliah: mata_kuliah_id (
            kode,
            nama,
            semester,
            sks,
            user_id
          )
        `
        )
        .eq("mahasiswa_id", profilMahasiswaId);

      if (coursesError) {
        console.error(
          "Gagal mengambil data mata kuliah mahasiswa:",
          coursesError.message
        );
        return;
      }

      // Ambil jadwal kelas untuk setiap mata kuliah dan nama dosen
      const schedulePromises = coursesData.map(async (course) => {
        const { data: scheduleData, error: scheduleError } = await supabase
          .from("jadwalkelas")
          .select(
            `
            jadwal_kelas_id,
            hari,
            waktu_mulai,
            waktu_selesai,
            ruangkelas: ruang_id (
              nama
            )
          `
          )
          .eq("mata_kuliah_id", course.mata_kuliah_id);

        if (scheduleError) {
          console.error(
            "Gagal mengambil data jadwal kelas:",
            scheduleError.message
          );
          return null;
        }

        // Ambil nama dosen dari tabel users menggunakan id dari matakuliah
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("full_name")
          .eq("id", course.matakuliah.user_id)
          .single();

        if (userError) {
          console.error("Gagal mengambil data user:", userError.message);
          return null;
        }

        return scheduleData.map((schedule) => ({
          ...course,
          day: schedule.hari,
          time: `${schedule.waktu_mulai} s/d ${schedule.waktu_selesai}`,
          room: schedule.ruangkelas.nama,
          courseName: course.matakuliah.nama,
          instructor: userData.full_name,
        }));
      });

      const schedules = (await Promise.all(schedulePromises))
        .flat()
        .filter(Boolean);

      setClasses(schedules);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    }
  };

  const fetchAttendanceStatus = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("presensi")
        .select("riwayatpresensi_id")
        .eq("user_id", userId)
        .eq("status", "Hadir");

      if (error) {
        console.error("Gagal mengambil data presensi:", error.message);
        return;
      }

      const status = data.reduce((acc, curr) => {
        acc[curr.riwayatpresensi_id] = true;
        return acc;
      }, {});

      setAttendanceStatus(status);
    } catch (error) {
      console.error("Gagal mengambil data presensi:", error.message);
    }
  };

  const handleScan = async (data) => {
    if (data && userId) {
      const jadwalKelasId = data;

      try {
        const { data: riwayatPresensi, error: errorRiwayat } = await supabase
          .from("riwayatpresensi")
          .select("*")
          .eq("jadwal_kelas_id", jadwalKelasId)
          .single();

        if (errorRiwayat) {
          console.error(
            "Gagal mengambil data riwayat presensi:",
            errorRiwayat.message
          );
          Swal.fire("Gagal", "Gagal mengambil data riwayat presensi.", "error");
          return;
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            const { error } = await supabase.from("presensi").insert([
              {
                user_id: userId,
                riwayatpresensi_id: riwayatPresensi.id,
                status: "Hadir",
                latitude: latitude,
                longitude: longitude,
              },
            ]);

            if (error) {
              console.error("Gagal menyimpan presensi:", error.message);
              Swal.fire("Gagal", "Gagal menyimpan presensi.", "error");
            } else {
              const updatedStatus = {
                ...attendanceStatus,
                [jadwalKelasId]: true,
              };
              setAttendanceStatus(updatedStatus);
              markPresent(scanIndex);
              Swal.fire("Berhasil", "Presensi berhasil disimpan.", "success");
            }
          });
        } else {
          Swal.fire(
            "Gagal",
            "Geolocation tidak didukung oleh browser Anda.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error scanning barcode:", error);
        Swal.fire("Gagal", "Gagal menyimpan presensi.", "error");
      }

      setScanning(false);
      setScanIndex(null);
    }
  };

  const startScan = async (index) => {
    try {
      console.log("Requesting camera permission...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      console.log("Camera permission granted");
      setScanIndex(index);
      setScanning(true);
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera permission denied:", err);
      alert("Akses kamera diperlukan untuk memindai QR code.");
    }
  };

  const markPresent = (index) => {
    const newClasses = [...classes];
    newClasses[index].studentPresent = true;
    setClasses(newClasses);
  };

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const image = new Image();
          image.src = imageSrc;
          image.onload = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (code) {
              handleScan(code.data);
            }
          };
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const steps = [
    {
      target: ".scan-button",
      content: "Klik tombol ini untuk mulai memindai QR code.",
    },
    {
      target: ".card",
      content: "Ini adalah kartu kelas, Untuk Melihat Jadwal kelas",
    },
  ];

  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
      <Tour steps={steps} />
      {scanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-3/4 md:w-1/2 lg:w-1/3">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={{
                facingMode: "environment",
              }}
              style={{ width: "100%", height: "100%" }}
            />
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <button
              onClick={() => setScanning(false)}
              className="w-full p-2 mt-4 text-white bg-red-500 rounded"
            >
              Batal
            </button>
          </div>
        </div>
      )}
      <div className="w-full py-2">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((item, index) => (
            <Card
              key={index}
              className={`p-4 ${
                item.studentPresent || attendanceStatus[item.riwayatpresensi_id]
                  ? "bg-green-100"
                  : ""
              } card`}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{item.courseName}</h2>
                  <p className="text-[12px] ">{item.instructor}</p>
                </div>
                {item.studentPresent ||
                attendanceStatus[item.riwayatpresensi_id] ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <button
                    onClick={() => startScan(index)}
                    className="text-blue-500 scan-button"
                  >
                    <FaQrcode />
                  </button>
                )}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <p className="pt-5">{item.room}</p>
                <div className="text-right">
                  <p>{item.day}</p>
                  <p>{item.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresensiMahasiswa;
