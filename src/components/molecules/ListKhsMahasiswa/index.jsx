import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Table from "@components/atoms/Table";

const ListKhsMahasiswa = () => {
  const khsData = [
    {
      code: "IF101",
      name: "Algoritma dan Pemrograman",
      sks: 3,
      nilaiUts: 80,
      nilaiAkhir: 85,
    },
    {
      code: "IF102",
      name: "Struktur Data",
      sks: 3,
      nilaiUts: 75,
      nilaiAkhir: 82,
    },
    { code: "IF103", name: "Basis Data", sks: 3, nilaiUts: 85, nilaiAkhir: 88 },
    {
      code: "IF104",
      name: "Sistem Operasi",
      sks: 3,
      nilaiUts: 78,
      nilaiAkhir: 80,
    },
  ];

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

  return (
    <div className="container mx-auto">
      <div ref={componentRef} className="print-black-and-white print-a3">
        <h1 className="mb-4 text-3xl font-bold text-center hidden-for-print text-neutral-dark">
          Kartu Hasil Studi
        </h1>
        <Table columns={columns} data={khsData} />
        <div className="flex justify-between mt-4 text-neutral-light">
          <h3>Total SKS: {totalSKS}</h3>
          <h3>IP Semester: {semesterGPA}</h3>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
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
