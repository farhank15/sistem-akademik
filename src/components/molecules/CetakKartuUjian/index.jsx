import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";
import Stemp from "@assets/logos/logo-verivikasi-stemp.png";

const CardKartu = ({ student }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Kartu Ujian Mahasiswa",
  });

  return (
    <div className="container mx-auto">
      <div
        ref={componentRef}
        className="p-6 mx-auto border border-gray-300 rounded-lg shadow-lg print-a3"
      >
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-neutral-light">
            UNIVERSITAS BALIKPAPAN
          </h1>
          <h2 className="text-xl font-semibold text-neutral-light">
            FAKULTAS TEKNIK
          </h2>
          <h3 className="text-lg font-medium text-neutral-light">
            KARTU UJIAN AKHIR SEMESTER
          </h3>
          <p className="text-neutral-light">Semester Genap 2023/2024</p>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <div>
              <p className="text-neutral-light">Nama: {student.name}</p>
              <p className="text-neutral-light">NIM: {student.nim}</p>
              <p className="text-neutral-light">
                Jurusan/Prodi: {student.program}
              </p>
            </div>
            <div>
              <p className="text-neutral-light">
                Status Jurusan: Terakreditasi
              </p>
              <p className="text-neutral-light">Jenjang Studi: Strata 1 (S1)</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <table className="min-w-full border border-collapse border-gray-700">
            <thead>
              <tr>
                <th className="px-2 py-1 border border-gray-700">No</th>
                <th className="px-2 py-1 border border-gray-700">KodeMK</th>
                <th className="px-2 py-1 border border-gray-700">Matakuliah</th>
                <th className="px-2 py-1 border border-gray-700">SKS</th>
                <th className="px-2 py-1 border border-gray-700">Kls</th>
                <th className="px-2 py-1 border border-gray-700">Dosen</th>
                <th className="px-2 py-1 border border-gray-700">Prf UTS</th>
                <th className="px-2 py-1 border border-gray-700">Prf UAS</th>
              </tr>
            </thead>
            <tbody>
              {student.exams.map((exam, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 border border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-2 py-1 border border-gray-700">
                    {exam.code}
                  </td>
                  <td className="px-2 py-1 border border-gray-700">
                    {exam.course}
                  </td>
                  <td className="px-2 py-1 border border-gray-700">
                    {exam.sks}
                  </td>
                  <td className="px-2 py-1 border border-gray-700">
                    {exam.class}
                  </td>
                  <td className="px-2 py-1 border border-gray-700">
                    {exam.lecturer}
                  </td>
                  <td className="px-2 py-1 border border-gray-700">
                    {exam.uts}
                  </td>
                  <td className="px-2 py-1 border border-gray-700">
                    {exam.uas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-neutral-light">Jumlah SKS: {student.totalSKS}</p>
          <p className="text-neutral-light">Yogyakarta, 6 Juli 2024</p>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <div className="w-32 h-40 mb-2 border border-gray-700">
              <p className="flex justify-center">2 x 3</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-neutral-light">Bagian Keuangan</p>
            <div>
              <img
                src={Stemp}
                alt="Verified Stamp"
                className="mx-auto w-72 -rotate-3"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-neutral-light">Mahasiswa</p>
            <div className="mt-4 mb-20"></div>
            <p className="text-neutral-light">{student.name}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          <FaPrint className="inline mr-2" /> Print Kartu Ujian
        </button>
      </div>
      <style>{`
        @media print {
          .print-a3 {
            size: A3 landscape;
            width: 297mm;
            height: 420mm;
            padding: 10mm;
            margin: 0 auto;
          }
          * {
            color: black !important;
          }
          img {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

const CetakKartuUjian = () => {
  const studentData = {
    name: "Ahmad Farhaan Kholik",
    nim: "21450410030",
    program: "Teknologi Informasi",
    exams: [
      {
        code: "UNKM6013",
        course: "Manajemen dan Teknologi Migas",
        sks: 3,
        class: "A1",
        lecturer: "Wirawan Widya Mandala S.T., M.T.",
        uts: "",
        uas: "",
      },
      {
        code: "TINFKM6013",
        course: "Arsitektur Enterprise",
        sks: 3,
        class: "A1",
        lecturer: "Eko Puji Laksmono, S.Kom., M.Kom.",
        uts: "",
        uas: "",
      },
      {
        code: "TINFKM6033",
        course: "KKN",
        sks: 3,
        class: "A1",
        lecturer: "Selvi Dwi Hartiyani, S.Kom., M.Pd.",
        uts: "",
        uas: "",
      },
      {
        code: "TINFKM6043",
        course: "Kriptografi",
        sks: 3,
        class: "A1",
        lecturer: "Agung Prayogo, S.Kom., M.Eng.",
        uts: "",
        uas: "",
      },
      {
        code: "TINFKM6053",
        course: "Manajemen Proyek",
        sks: 3,
        class: "A1",
        lecturer: "Eko Puji Laksmono, S.Kom., M.Kom.",
        uts: "",
        uas: "",
      },
      {
        code: "TINFKM6063",
        course: "Manajemen Resiko",
        sks: 3,
        class: "A1",
        lecturer: "Selvi Dwi Hartiyani, S.Kom., M.Pd.",
        uts: "",
        uas: "",
      },
      {
        code: "TINFKM6023",
        course: "Kerja Praktek",
        sks: 3,
        class: "A1 & JSP",
        lecturer: "Eko Puji Laksmono, S.Kom., M.Kom.",
        uts: "",
        uas: "",
      },
    ],
    totalSKS: 21,
  };

  return (
    <div className="min-h-screen ">
      <CardKartu student={studentData} />
    </div>
  );
};

export default CetakKartuUjian;
