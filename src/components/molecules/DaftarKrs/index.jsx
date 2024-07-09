import React, { useState, useEffect } from "react";
import CardListStudi from "@components/molecules/CardListStudi";
import SearchBar from "@components/atoms/SearchBar";
import Tour from "@components/atoms/Tour";
import supabase from "@/client/supabase"; // Pastikan supabase client telah terkonfigurasi dengan benar
import { jwtDecode } from "jwt-decode"; // Import jwt-decode untuk mendekode token JWT
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer dan toast dari react-toastify
import "react-toastify/dist/ReactToastify.css"; // Styling untuk react-toastify

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
  const [courses, setCourses] = useState([]); // State untuk menyimpan daftar mata kuliah
  const [user, setUser] = useState(null); // State untuk menyimpan informasi pengguna yang sedang login

  useEffect(() => {
    fetchCourses();
    fetchUser(); // Panggil fungsi untuk mendapatkan informasi pengguna yang sedang login
  }, []);

  const fetchUser = async () => {
    try {
      // Dekode token JWT dari cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_session="))
        .split("=")[1];
      const decoded = jwtDecode(token);

      // Simpan informasi pengguna yang sedang login ke dalam state
      setUser(decoded);
      fetchSelectedCourses(decoded.id); // Panggil fungsi untuk mendapatkan mata kuliah yang sudah dipilih berdasarkan user_id
    } catch (error) {
      console.error("Gagal mendapatkan informasi pengguna:", error.message);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase.from("matakuliah").select("*");
      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        setCourses(data);
      }
    } catch (error) {
      console.error("Gagal mengambil data mata kuliah:", error.message);
    }
  };

  const fetchSelectedCourses = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("krsapproval")
        .select("mata_kuliah_id, matakuliah (kode, nama, sks, semester)")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const selectedCoursesData = data.map((item) => ({
          ...item.matakuliah,
          mata_kuliah_id: item.mata_kuliah_id,
        }));
        setSelectedCourses(selectedCoursesData);
        setTotalSks(
          selectedCoursesData.reduce((sum, course) => sum + course.sks, 0)
        );
      }
    } catch (error) {
      console.error(
        "Gagal mengambil mata kuliah yang sudah dipilih:",
        error.message
      );
    }
  };

  const handleCourseClick = async (course) => {
    if (
      selectedCourses.some((c) => c.mata_kuliah_id === course.mata_kuliah_id)
    ) {
      // Hapus dari KRSApproval
      try {
        const { data: deleteData, error: deleteError } = await supabase
          .from("krsapproval")
          .delete()
          .match({
            mata_kuliah_id: course.mata_kuliah_id,
            user_id: user.id,
          });

        if (deleteError) {
          throw deleteError;
        }

        setSelectedCourses(
          selectedCourses.filter(
            (c) => c.mata_kuliah_id !== course.mata_kuliah_id
          )
        );
        setTotalSks(totalSks - course.sks);
        toast.success(`${course.nama} dihapus dari KRS.`); // Gunakan toast.success untuk notifikasi sukses
      } catch (error) {
        console.error("Gagal menghapus dari KRS:", error.message);
      }
    } else {
      // Tambahkan ke KRSApproval
      try {
        const { data: insertData, error: insertError } = await supabase
          .from("krsapproval")
          .insert([
            {
              mata_kuliah_id: course.mata_kuliah_id,
              user_id: user.id,
              status: "Pending",
              tanggal: new Date().toISOString().slice(0, 10), // Tanggal hari ini
            },
          ]);

        if (insertError) {
          throw insertError;
        }

        setSelectedCourses([...selectedCourses, course]);
        setTotalSks(totalSks + course.sks);
        toast.success(`${course.nama} ditambahkan ke KRS.`); // Gunakan toast.success untuk notifikasi sukses
      } catch (error) {
        console.error("Gagal menambahkan ke KRS:", error.message);
      }
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
      course.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <ToastContainer position="top-right" autoClose={1200} />{" "}
      {/* Container untuk react-toastify */}
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
            key={course.mata_kuliah_id}
            course={{
              code: course.kode,
              name: course.nama,
              sks: course.sks,
              semester: course.semester,
            }}
            isSelected={selectedCourses.some(
              (c) => c.mata_kuliah_id === course.mata_kuliah_id
            )}
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
