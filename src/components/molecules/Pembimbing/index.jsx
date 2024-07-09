import { useEffect, useState } from "react";
import supabase from "@/client/supabase"; // Import supabase client
import { jwtDecode } from "jwt-decode"; // Import jwt-decode untuk mendekode token JWT
import Card from "@components/atoms/Card"; // Import Card component

const Pembimbing = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_session="))
        .split("=")[1];
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      // Fetch the profil_dosen_id for the logged-in user
      const { data: dosenData, error: dosenError } = await supabase
        .from("profil_dosen")
        .select("profil_dosen_id")
        .eq("user_id", userId)
        .single();

      if (dosenError) {
        throw dosenError;
      }

      const profilDosenId = dosenData.profil_dosen_id;

      // Fetch the students supervised by the logged-in dosen
      const { data: dospemData, error: dospemError } = await supabase
        .from("dosen_dospem")
        .select("mahasiswa_id, status")
        .eq("dosen_id", profilDosenId)
        .eq("status", "Aktif");

      if (dospemError) {
        throw dospemError;
      }

      // Fetch the details of the students
      const mahasiswaIds = dospemData.map((dospem) => dospem.mahasiswa_id);

      const { data: mahasiswaData, error: mahasiswaError } = await supabase
        .from("profil_mahasiswa")
        .select("nama, email, profil_mahasiswa_id")
        .in("profil_mahasiswa_id", mahasiswaIds);

      if (mahasiswaError) {
        throw mahasiswaError;
      }

      // Merge the mahasiswa data with the dospem status
      const studentsWithStatus = mahasiswaData.map((mahasiswa) => {
        const dospem = dospemData.find(
          (dospem) => dospem.mahasiswa_id === mahasiswa.profil_mahasiswa_id
        );
        return { ...mahasiswa, status: dospem.status };
      });

      setStudents(studentsWithStatus);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {students.map((student) => (
            <Card
              key={student.profil_mahasiswa_id}
              className="p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold">{student.nama}</h2>
              <p className="text-gray-300">{student.email}</p>
              <p className="text-gray-300">Status: {student.status}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pembimbing;
