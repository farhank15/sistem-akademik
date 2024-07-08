import { useState, useRef, useEffect } from "react";
import { FaQrcode, FaCheck } from "react-icons/fa";
import Card from "@components/atoms/Card";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import Tour from "@components/atoms/Tour";

const PresensiMahasiswa = () => {
  const initialClasses = [
    {
      day: "Senin",
      time: "10:15 s/d 12:45",
      course: "Kerja Praktek",
      code: "TINKFM6023",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Ir. Budi Santoso",
      room: "Ruang 101",
      studentPresent: false,
    },
    {
      day: "Selasa",
      time: "13:00 s/d 15:30",
      course: "Arsitektur Enterprise",
      code: "TINKFM6013",
      sks: 3,
      semester: "Genap",
      instructor: "Prof. Dr. Siti Aminah",
      room: "Ruang 202",
      studentPresent: false,
    },
    {
      day: "Selasa",
      time: "10:15 s/d 12:45",
      course: "Manajemen Resiko",
      code: "TINKFM6063",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Andi Wijaya",
      room: "Ruang 203",
      studentPresent: false,
    },
    {
      day: "Rabu",
      time: "07:30 s/d 10:00",
      course: "Kriptografi",
      code: "TINKFM6043",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Maya Sari",
      room: "Ruang 204",
      studentPresent: false,
    },
    {
      day: "Rabu",
      time: "13:00 s/d 15:30",
      course: "Manajemen Proyek",
      code: "TINKFM6053",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Joko Susilo",
      room: "Ruang 205",
      studentPresent: false,
    },
    {
      day: "Minggu",
      time: "07:30 s/d 10:00",
      course: "KKN",
      code: "TINKFM6033",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Retno Wulan",
      room: "Ruang 206",
      studentPresent: false,
    },
    {
      day: "Kamis",
      time: "15:45 s/d 18:15",
      course: "Manajemen dan Teknologi Migas (Kapita Selekta Migas)",
      code: "UNKFM6013",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Ahmad Zaini",
      room: "Ruang 207",
      studentPresent: false,
    },
  ];

  const [classes, setClasses] = useState(initialClasses);
  const [scanning, setScanning] = useState(false);
  const [scanIndex, setScanIndex] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      markPresent(scanIndex);
      setScanning(false);
      setScanIndex(null);
    }
  };

  const handleError = (err) => {
    console.error("Scan error:", err);
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
                item.studentPresent ? "bg-green-100" : ""
              } card`}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{item.course}</h2>
                  <p className="text-[12px] ">{item.instructor}</p>
                </div>
                {item.studentPresent ? (
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
