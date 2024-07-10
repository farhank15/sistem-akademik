import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Table from "@components/atoms/Table";
import Tour from "@components/atoms/Tour";
import Logo from "@assets/logos/logo_up.png";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import supabase from "@/client/supabase";

const TranskripNilai = () => {
  const [transkripData, setTranskripData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    nama: "-",
    tempat_lahir: "-",
    tanggal_lahir: "-",
    program_studi: "-",
    fakultas: "-",
    akreditasi: "-",
    nim: "-",
  });

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
      fetchStudentInfo(userId);
      fetchApprovedCourses(userId);
    }
  }, [userId]);

  const fetchStudentInfo = async (userId) => {
    try {
      const { data: mahasiswaData, error: mahasiswaError } = await supabase
        .from("profil_mahasiswa")
        .select(
          "nama, tempat_lahir, tanggal_lahir, program_studi, fakultas, user_id"
        )
        .eq("user_id", userId)
        .single();

      if (mahasiswaError) {
        console.error(
          "Gagal mengambil profil mahasiswa:",
          mahasiswaError.message
        );
        return;
      }

      setStudentInfo({
        nama: mahasiswaData.nama || "-",
        tempat_lahir: mahasiswaData.tempat_lahir || "-",
        tanggal_lahir: mahasiswaData.tanggal_lahir || "-",
        program_studi: mahasiswaData.program_studi || "-",
        fakultas: mahasiswaData.fakultas || "-",
        akreditasi: "A", // You can adjust this value as needed
        nim: userId, // Assuming userId is the same as nim
      });
    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error.message);
    }
  };

  const fetchApprovedCourses = async (userId) => {
    try {
      const { data: krsData, error: krsError } = await supabase
        .from("krsapproval")
        .select(
          `
          mata_kuliah_id,
          status,
          matakuliah: mata_kuliah_id (
            kode,
            nama,
            semester,
            sks
          )
        `
        )
        .eq("user_id", userId)
        .eq("status", "Diterima");

      if (krsError) {
        console.error("Gagal mengambil data KRS:", krsError.message);
        return;
      }

      const approvedCourses = krsData.map((item) => ({
        semester: item.matakuliah.semester,
        code: item.matakuliah.kode,
        name: item.matakuliah.nama,
        sks: item.matakuliah.sks,
        nilaiAkhir: "N/A", // Placeholder for the actual grade
      }));

      setTranskripData(approvedCourses);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    }
  };

  const columns = [
    { header: "Semester", accessor: "semester" },
    { header: "Kode", accessor: "code" },
    { header: "Mata Kuliah", accessor: "name" },
    { header: "SKS", accessor: "sks" },
    { header: "Nilai Akhir", accessor: "nilaiAkhir" },
  ];

  const calculateTotalSKS = () =>
    transkripData.reduce((total, course) => total + course.sks, 0);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Transkrip Nilai",
  });

  const steps = [
    {
      target: ".table-container",
      content: "Daftar nilai mata kuliah yang sudah diambil.",
    },
    {
      target: ".total-sks",
      content: "Total SKS yang diambil selama keseluruhan studi.",
    },
    {
      target: ".print-button",
      content: "Klik tombol ini untuk mencetak transkrip nilai ke dalam PDF.",
    },
    {
      target: ".total-ipk",
      content:
        "Total Indeks Prestasi Kumulatif yang diambil selama keseluruhan studi.",
    },
  ];

  return (
    <div className="container mx-auto">
      <Tour steps={steps} />
      <div ref={componentRef} className="print-a3">
        <div className="flex mb-2 hidden-for-print">
          <div>
            <img src={Logo} alt="Logo Universitas" className="w-24 mb-4" />
          </div>
          <div className="ml-5">
            <h1 className="text-3xl font-bold">UNIVERSITAS PROKLAMASI 45</h1>
            <h2 className="text-xl">FAKULTAS TEKNIK</h2>
            <h3 className="mb-4 text-xl">TRANSKRIP NILAI</h3>
          </div>
        </div>
        <hr className="hidden-for-print" />
        <div className="mt-5 mb-4 student-info hidden-for-print">
          <table className="w-full no-border">
            <tbody>
              <tr>
                <td>
                  <b>Nama</b>
                </td>
                <td>: {studentInfo.nama}</td>
                <td>
                  <b>Jenjang Pendidikan</b>
                </td>
                <td>: Strata 1</td>
              </tr>
              <tr>
                <td>
                  <b>NIM</b>
                </td>
                <td>: {studentInfo.nim}</td>
                <td>
                  <b>Program Studi</b>
                </td>
                <td>: {studentInfo.program_studi}</td>
              </tr>
              <tr>
                <td>
                  <b>Tempat Lahir</b>
                </td>
                <td>: {studentInfo.tempat_lahir}</td>
                <td>
                  <b>Akreditasi</b>
                </td>
                <td>: {studentInfo.akreditasi}</td>
              </tr>
              <tr>
                <td>
                  <b>Tanggal Lahir</b>
                </td>
                <td>: {studentInfo.tanggal_lahir}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-container">
          <Table columns={columns} data={transkripData} />
        </div>
        <div className="flex justify-between mt-4">
          <h3 className="total-sks">Jumlah SKS: {calculateTotalSKS()}</h3>
          <h3 className="total-ipk">IPK: 3.67</h3>
        </div>
        <div className="mt-8 text-right print-only">
          <p>Yogyakarta, 7 Juli 2024</p>
          <p>Kepala Program Studi</p>
          <p className="mt-24">Sapitri Gustina, S.Kom., M.Kom.</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 print-button"
        >
          Print to PDF
        </button>
      </div>
      <style>{`
        .student-info table {
          width: 100%;
          border-collapse: collapse;
        }
        .print-a3 .no-border td {
          border: none !important;
        }
        .student-info td {
          padding: 8px;
        }
        @media print {
          .print-a3 {
            size: A3 landscape;
            width: 297mm;
            height: 420mm;
            padding: 10mm;
            margin: 0 auto;
          }
          .print-a3 * {
            color: black !important;
            background: white !important;
            -webkit-print-color-adjust: exact; 
            color-adjust: exact;
          }
          .print-a3 table, .print-a3 th, .print-a3 td {
            border-collapse: collapse !important;
            padding: 4px !important;
          }
          .hidden-for-print {
            display: flex !important; 
          }
          .print-only {
            display: block !important;
          }
        }
        .hidden-for-print {
          display: none;
        }
        .print-only {
          display: none;
        }
        .table-container {
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
};

export default TranskripNilai;
