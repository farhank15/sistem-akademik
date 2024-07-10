import React, { useState, useEffect } from "react";
import Card from "@components/atoms/Card";
import { FaCheck, FaTimes } from "react-icons/fa";
import supabase from "@/client/supabase"; // Import supabase client
import { jwtDecode } from "jwt-decode"; // Import jwt-decode untuk mendekode token JWT
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "@components/atoms/SearchBar"; // Import SearchBar component

const AccKrsDosen = () => {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchKrsRequests(user.id);
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

  const fetchKrsRequests = async (userId) => {
    try {
      // Ambil profil_dosen_id dari Profil_Dosen
      const { data: dosenData, error: dosenError } = await supabase
        .from("profil_dosen")
        .select("profil_dosen_id")
        .eq("user_id", userId)
        .single();

      if (dosenError) {
        throw dosenError;
      }

      const profilDosenId = dosenData.profil_dosen_id;

      // Ambil mahasiswa_id dari Dosen_Dospem
      const { data: dospemData, error: dospemError } = await supabase
        .from("dosen_dospem")
        .select("dosen_dospem_id, mahasiswa_id")
        .eq("dosen_id", profilDosenId)
        .eq("status", "Aktif");

      if (dospemError) {
        throw dospemError;
      }

      const mahasiswaIds = dospemData.map((d) => d.mahasiswa_id);
      const dosenDospemIds = dospemData.map((d) => d.dosen_dospem_id);

      // Ambil user_id dari Profil_Mahasiswa
      const { data: mahasiswaData, error: mahasiswaError } = await supabase
        .from("profil_mahasiswa")
        .select("profil_mahasiswa_id, user_id")
        .in("profil_mahasiswa_id", mahasiswaIds);

      if (mahasiswaError) {
        throw mahasiswaError;
      }

      const mahasiswaIdMap = new Map(
        mahasiswaData.map((m) => [m.user_id, m.profil_mahasiswa_id])
      );

      // Ambil data KRSApproval berdasarkan dosen_dospem_id dan user_id mahasiswa
      const { data: krsData, error: krsError } = await supabase
        .from("krsapproval")
        .select(
          `
          approval_id,
          user_id,
          dosen_dospem_id,
          mata_kuliah_id,
          status,
          matakuliah (
            kode,
            nama,
            sks,
            semester,
            user_id
          ),
          users (
            full_name
          )
        `
        )
        .in("user_id", Array.from(mahasiswaIdMap.keys()))
        .in("dosen_dospem_id", dosenDospemIds)
        .eq("status", "Pending");

      if (krsError) {
        throw krsError;
      }

      if (krsData) {
        setRequests(
          krsData.map((request) => ({
            ...request,
            mahasiswa_id: mahasiswaIdMap.get(request.user_id),
          }))
        );
      }
    } catch (error) {
      console.error("Gagal mengambil data pengajuan KRS:", error.message);
    }
  };

  const handleApprove = async (approvalId, mahasiswaId, mataKuliahId) => {
    try {
      console.log(
        "mahasiswa_id:",
        mahasiswaId,
        "mata_kuliah_id:",
        mataKuliahId
      ); // Debugging log

      const { error } = await supabase
        .from("krsapproval")
        .update({ status: "Diterima" })
        .eq("approval_id", approvalId);

      if (error) {
        throw error;
      }

      // Insert the approved mata_kuliah into mahasiswamatakuliah table
      const { data, error: insertError } = await supabase
        .from("mahasiswamatakuliah")
        .insert({ mahasiswa_id: mahasiswaId, mata_kuliah_id: mataKuliahId });

      if (insertError) {
        throw insertError;
      }

      setRequests(
        requests.filter((request) => request.approval_id !== approvalId)
      );
      toast.success("Pengajuan KRS berhasil diterima.");
    } catch (error) {
      console.error("Gagal menerima pengajuan KRS:", error.message);
    }
  };

  const handleReject = async (approvalId) => {
    try {
      const { error } = await supabase
        .from("krsapproval")
        .update({ status: "Ditolak" })
        .eq("approval_id", approvalId);

      if (error) {
        throw error;
      }

      setRequests(
        requests.filter((request) => request.approval_id !== approvalId)
      );
      toast.error("Pengajuan KRS berhasil ditolak.");
    } catch (error) {
      console.error("Gagal menolak pengajuan KRS:", error.message);
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matakuliah = request.matakuliah || {};
    const mahasiswa = request.users || {};

    return (
      (matakuliah.nama &&
        matakuliah.nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (mahasiswa.full_name &&
        mahasiswa.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="container mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari berdasarkan nama mahasiswa atau mata kuliah..."
      />
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        {filteredRequests.map((request) => {
          const matakuliah = request.matakuliah || {};
          const mahasiswa = request.users || {};

          return (
            <Card
              key={request.approval_id}
              className="relative p-4 border border-primary"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    {matakuliah.nama || "Nama mata kuliah tidak tersedia"}
                  </h3>
                  <p className="text-[12px] text-gray-500">
                    Kode: {matakuliah.kode || "Kode tidak tersedia"}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    SKS: {matakuliah.sks || "SKS tidak tersedia"}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Semester: {matakuliah.semester || "Semester tidak tersedia"}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Mahasiswa:{" "}
                    {mahasiswa.full_name || "Nama mahasiswa tidak tersedia"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="text-green-500"
                    onClick={() =>
                      handleApprove(
                        request.approval_id,
                        request.mahasiswa_id,
                        request.mata_kuliah_id
                      )
                    }
                  >
                    <FaCheck size={24} />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleReject(request.approval_id)}
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AccKrsDosen;
