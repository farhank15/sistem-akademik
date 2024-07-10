import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Table from "@components/atoms/Table";
import Tour from "@components/atoms/Tour";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import supabase from "@/client/supabase";

const ListKhsMahasiswa = () => {
  const [khsData, setKhsData] = useState([]);
  const [userId, setUserId] = useState(null);

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
      fetchKhsData(userId);
    }
  }, [userId]);

  const fetchKhsData = async (userId) => {
    try {
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

      const { data: krsData, error: krsError } = await supabase
        .from("krsapproval")
        .select(
          `
          mata_kuliah_id,
          status,
          matakuliah: mata_kuliah_id (
            kode,
            nama,
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

      setKhsData(
        krsData.map((item) => ({
          code: item.matakuliah.kode,
          name: item.matakuliah.nama,
          sks: item.matakuliah.sks,
          nilaiUts: 0,
          nilaiAkhir: 0,
        }))
      );
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    }
  };

  const columns = [
    { header: "Kode", accessor: "code" },
    { header: "Mata Kuliah", accessor: "name" },
    { header: "SKS", accessor: "sks" },
    { header: "Nilai UTS", accessor: "nilaiUts" },
    { header: "Nilai Akhir", accessor: "nilaiAkhir" },
    { header: "Total Nilai", accessor: (row) => row.nilaiUts + row.nilaiAkhir },
  ];

  const calculateTotalSKS = () => {
    return khsData.reduce((total, course) => total + course.sks, 0);
  };

  const calculateSemesterGPA = () => {
    let totalSKS = 0;
    let totalNilai = 0;

    khsData.forEach((course) => {
      totalSKS += course.sks;
      totalNilai += course.nilaiAkhir;
    });

    return (totalNilai / totalSKS).toFixed(2);
  };

  const totalSKS = calculateTotalSKS();
  const semesterGPA = calculateSemesterGPA();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Kartu Hasil Studi (KHS)",
  });

  const steps = [
    {
      target: ".table-container", // Anda perlu menambahkan className ke elemen tabel
      content: "Daftar nilai mata kuliah yang sudah diambil.",
    },
    {
      target: ".total-sks",
      content: "Total SKS yang diambil selama semester ini.",
    },
    {
      target: ".semester-gpa",
      content: "Indeks Prestasi Semester (IP) yang didapatkan.",
    },
    {
      target: ".print-button",
      content: "Klik tombol ini untuk mencetak KHS ke dalam PDF.",
    },
  ];

  return (
    <div className="container mx-auto">
      <Tour steps={steps} />
      <div ref={componentRef} className="print-black-and-white print-a3">
        <h1 className="mb-4 text-3xl font-bold text-center hidden-for-print text-neutral-dark">
          Kartu Hasil Studi
        </h1>
        <div className="table-container">
          <Table columns={columns} data={khsData} />
        </div>
        <div className="flex justify-between mt-4 text-neutral-light">
          <h3 className="total-sks">Total SKS: {totalSKS}</h3>
          <h3 className="semester-gpa">IP Semester: {semesterGPA}</h3>
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
        @media print {
          .print-black-and-white * {
            color: black !important;
            background: white !important;
            -webkit-print-color-adjust: exact; /* Chrome, Safari */
            color-adjust: exact; /* Firefox */
          }
          .print-a3 {
            size: A3 landscape;
            width: 297mm;
            height: 420mm;
            padding-top: 30mm;
            padding-left: 10mm;
            padding-right: 10mm;
            margin: 0 auto;
            border: 1px solid black;
          }
          .print-a3 table,
          .print-a3 th,
          .print-a3 td {
            border: 1px solid black !important;
            border-collapse: collapse !important;
          }
          .print-a3 th,
          .print-a3 td {
            padding: 8px !important;
          }
          .hidden-for-print {
            display: block !important;
          }
        }
        .hidden-for-print {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ListKhsMahasiswa;
