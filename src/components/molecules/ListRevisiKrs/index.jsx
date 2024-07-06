import Card from "@components/atoms/Card";
import { FaCheck } from "react-icons/fa";

const ListRevisiKrs = ({ selectedCourses }) => {
  // Dummy data array untuk contoh
  const data = [
    {
      code: "IF101",
      name: "Algoritma dan Pemrograman",
      sks: 3,
      instructor: "Dr. Budi",
      semester: "1",
      isAccepted: Math.random() < 0.5,
    },
    {
      code: "IF102",
      name: "Struktur Data",
      sks: 3,
      instructor: "Dr. Siti",
      semester: "2",
      isAccepted: Math.random() < 0.5,
    },
    {
      code: "IF103",
      name: "Basis Data",
      sks: 3,
      instructor: "Dr. Andi",
      semester: "2",
      isAccepted: Math.random() < 0.5,
    },
    {
      code: "IF104",
      name: "Sistem Operasi",
      sks: 3,
      instructor: "Dr. Maya",
      semester: "3",
      isAccepted: Math.random() < 0.5,
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-center p-4 gap-x-5 md:gap-x-10">
        <div className="flex items-center gap-2">
          <FaCheck className="w-5 h-5 text-green-500" />
          <p>Diterima</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <p>Diproses</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <p>Ditolak</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data.map((course) => (
          <SelectedCourseCard key={course.code} course={course} />
        ))}
      </div>
    </div>
  );
};

const SelectedCourseCard = ({ course }) => {
  const { name, code, sks, instructor, semester, isAccepted } = course;

  return (
    <Card className="relative p-2 pt-4 border border-primary">
      <div className="absolute top-2 right-2">
        {isAccepted ? (
          <FaCheck className="w-5 h-5 text-green-500" />
        ) : isAccepted === false ? (
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        ) : (
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-[12px] text-gray-300">Kode: {code}</p>
        <p className="text-[12px] text-gray-300">SKS: {sks}</p>
        <p className="text-[12px] text-gray-300">Dosen: {instructor}</p>

        <p className="text-[12px] text-gray-300 text-right">
          Semester: {semester}
        </p>
      </div>
    </Card>
  );
};

export default ListRevisiKrs;
