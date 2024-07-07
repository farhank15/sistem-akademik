import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Table from "@components/atoms/Table";
import Tour from "@components/atoms/Tour";
import Logo from "@assets/logos/logo_up.png";

const TranskripNilai = () => {
  const transkripData = [
    {
      semester: 1,
      code: "IF101",
      name: "Algoritma dan Pemrograman",
      sks: 3,
      nilaiAkhir: "A",
    },
    {
      semester: 2,
      code: "IF102",
      name: "Struktur Data",
      sks: 3,
      nilaiAkhir: "B+",
    },
    {
      semester: 2,
      code: "IF103",
      name: "Basis Data",
      sks: 3,
      nilaiAkhir: "A-",
    },
    {
      semester: 3,
      code: "IF104",
      name: "Sistem Operasi",
      sks: 3,
      nilaiAkhir: "B",
    },
    // Tambahkan data mata kuliah lainnya sesuai kebutuhan
  ];

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
                <td>: Ahmad FARHAN KHOLIK</td>
                <td>
                  <b>Jenjang Pendidikan</b>
                </td>
                <td>: Strata 1</td>
              </tr>
              <tr>
                <td>
                  <b>NIM</b>
                </td>
                <td>: 2145041030</td>
                <td>
                  <b>Program Studi</b>
                </td>
                <td>: Teknologi Informasi</td>
              </tr>
              <tr>
                <td>
                  <b>Tempat Lahir</b>
                </td>
                <td>: LAMONGAN</td>
                <td>
                  <b>Akreditasi</b>
                </td>
                <td>: A</td>
              </tr>
              <tr>
                <td>
                  <b>Tanggal Lahir</b>
                </td>
                <td>: 2003-02-25</td>
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
            display: flex !important; /* Menggunakan display flex saat dicetak */
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
