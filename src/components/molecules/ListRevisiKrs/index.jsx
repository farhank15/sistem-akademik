import React, { useState, useEffect } from "react";
import Card from "@components/atoms/Card";
import { FaCheck } from "react-icons/fa";
import supabase from "@/client/supabase"; // Import supabase client
import { jwtDecode } from "jwt-decode"; // Import jwt-decode untuk mendekode token JWT

const ListRevisiKrs = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchApprovedCourses();
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_session="))
        .split("=")[1];
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error("Gagal mendapatkan informasi pengguna:", error.message);
    }
  };

  const fetchApprovedCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("krsapproval")
        .select(
          `
          mata_kuliah_id,
          status,
          matakuliah (
            kode,
            nama,
            sks,
            semester
          )
        `
        )
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      if (data) {
        setCourses(data);
      }
    } catch (error) {
      console.error("Gagal mengambil data persetujuan KRS:", error.message);
    }
  };

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
        {courses.map((course) => (
          <SelectedCourseCard key={course.mata_kuliah_id} course={course} />
        ))}
      </div>
    </div>
  );
};

const SelectedCourseCard = ({ course }) => {
  const {
    matakuliah: { nama, kode, sks, semester },
    status,
  } = course;

  return (
    <Card className="relative p-2 pt-4 border border-primary">
      <div className="absolute top-2 right-2">
        {status === "Diterima" ? (
          <FaCheck className="w-5 h-5 text-green-500" />
        ) : status === "Ditolak" ? (
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        ) : (
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-xl font-semibold">{nama}</h3>
        <p className="text-[12px] mt-2 text-gray-300">Kode: {kode}</p>
        <p className="text-[12px] text-gray-300">SKS: {sks}</p>
        <p className="text-[12px] text-gray-300 text-right">
          Semester: {semester}
        </p>
      </div>
    </Card>
  );
};

export default ListRevisiKrs;
