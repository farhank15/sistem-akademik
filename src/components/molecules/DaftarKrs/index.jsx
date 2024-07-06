import { useState } from "react";
import CardListStudi from "@components/molecules/CardListStudi";
import SearchBar from "@components/atoms/SearchBar";

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

const DaftarKrs = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCourseClick = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
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
      <div className="flex justify-center my-4">
        <SearchBar
          placeholder="Cari berdasarkan kode, nama mata kuliah, atau nama dosen..."
          value={searchTerm}
          onChange={handleSearch}
          onClear={handleClearSearch} // Menambahkan handleClearSearch
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CardListStudi
            key={course.code}
            course={course}
            isSelected={selectedCourses.includes(course)}
            onClick={() => handleCourseClick(course)}
          />
        ))}
      </div>
    </div>
  );
};

export default DaftarKrs;
