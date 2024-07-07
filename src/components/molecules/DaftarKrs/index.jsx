import { useState } from "react";
import CardListStudi from "@components/molecules/CardListStudi";
import SearchBar from "@components/atoms/SearchBar";
import Tour from "@components/atoms/Tour";

const courses = [
  {
    code: "IF101",
    name: "Algoritma dan Pemrograman",
    sks: 3,
    instructor: "Dr. Budi",
    semester: "1",
  },
  {
    code: "IF102",
    name: "Struktur Data",
    sks: 3,
    instructor: "Dr. Siti",
    semester: "2",
  },
  {
    code: "IF103",
    name: "Basis Data",
    sks: 3,
    instructor: "Dr. Andi",
    semester: "2",
  },
  {
    code: "IF104",
    name: "Sistem Operasi",
    sks: 3,
    instructor: "Dr. Maya",
    semester: "3",
  },
];

const steps = [
  {
    target: ".search-bar",
    content: "Cari mata kuliah berdasarkan kode, nama, atau dosen.",
  },
  {
    target: ".course-list",
    content:
      "Daftar mata kuliah yang tersedia, klik untuk menambah dan menghapusnya",
  },
  {
    target: ".total-sks",
    content: "Jumlah SKS total yang sudah dipilih.",
  },
  {
    target: ".max-sks",
    content:
      "Jumlah akumulasi SKS yang sudah diambil dari semester1 hingga sekarang.",
  },
];

const DaftarKrs = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalSks, setTotalSks] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCourseClick = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
      setTotalSks(totalSks - course.sks);
    } else {
      setSelectedCourses([...selectedCourses, course]);
      setTotalSks(totalSks + course.sks);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <Tour steps={steps} />
      <div className="flex justify-center my-4 search-bar">
        <SearchBar
          placeholder="Cari berdasarkan kode, nama mata kuliah, atau nama dosen..."
          value={searchTerm}
          onChange={handleSearch}
          onClear={handleClearSearch}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 course-list">
        {filteredCourses.map((course) => (
          <CardListStudi
            key={course.code}
            course={course}
            isSelected={selectedCourses.includes(course)}
            onClick={() => handleCourseClick(course)}
          />
        ))}
      </div>
      <div className="fixed left-0 flex items-center justify-center w-12 h-8 py-1 mb-4 ml-4 rounded-full bottom-2 bg-warning total-sks">
        <p className="text-sm font-semibold text-center text-primary">
          {totalSks}
        </p>
      </div>
      <div className="fixed right-0 flex items-center justify-center w-12 h-8 py-1 mb-4 mr-4 rounded-full bottom-2 bg-warning max-sks">
        <p className="text-sm font-semibold text-center text-primary">24</p>
      </div>
    </div>
  );
};

export default DaftarKrs;
