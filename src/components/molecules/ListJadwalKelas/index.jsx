import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FaCheck, FaEdit } from "react-icons/fa";
import Card from "@components/atoms/Card";
import Modal from "@components/atoms/Modal";
import Tour from "@components/atoms/Tour";
import supabase from "@/client/supabase";
import Swal from "sweetalert2"; // Import SweetAlert

const ListJadwalKelas = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [rooms, setRooms] = useState([]); // State untuk menyimpan daftar ruangan

  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Set user ID dari token
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchClasses(userId);
      fetchRooms();
    }
  }, [userId]);

  const fetchClasses = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("jadwalkelas")
        .select(
          `
          jadwal_kelas_id,
          user_id,
          mata_kuliah_id,
          hari,
          waktu_mulai,
          waktu_selesai,
          ruang_id,
          matakuliah (
            kode,
            nama,
            semester,
            sks
          ),
          ruangkelas:ruang_id (
            nama
          )
        `
        )
        .eq("user_id", userId);

      if (error) {
        console.error("Gagal mengambil data jadwal kelas:", error.message);
        return;
      }

      setClasses(data);
      setFilteredClasses(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase.from("ruangkelas").select("*");
      if (error) {
        console.error("Gagal mengambil data ruangan:", error.message);
        return;
      }
      setRooms(data);
    } catch (error) {
      console.error("Gagal mengambil data ruangan:", error.message);
    }
  };

  const handleEdit = (index) => {
    setEditingClass({ ...filteredClasses[index], index });
  };

  const handleSave = async () => {
    if (editingClass !== null) {
      const { jadwal_kelas_id, hari, waktu_mulai, waktu_selesai, ruang_id } =
        editingClass;

      try {
        const { data, error } = await supabase
          .from("jadwalkelas")
          .update({ hari, waktu_mulai, waktu_selesai, ruang_id })
          .eq("jadwal_kelas_id", jadwal_kelas_id);

        if (error) {
          console.error("Gagal memperbarui data jadwal kelas:", error.message);
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Terjadi kesalahan dalam memperbarui jadwal kelas.",
            showConfirmButton: false,
            timer: 1200,
          });
          return;
        }

        // Update state classes dan filteredClasses
        const updatedClasses = classes.map((cls, idx) =>
          idx === editingClass.index ? editingClass : cls
        );
        setClasses(updatedClasses);
        setFilteredClasses(updatedClasses);
        setEditingClass(null);

        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Berhasil memperbarui jadwal kelas.",
          showConfirmButton: false,
          timer: 1200,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan dalam memperbarui jadwal kelas.",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingClass({ ...editingClass, [name]: value });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = classes.filter(
      (item) =>
        item.matakuliah.nama.toLowerCase().includes(value.toLowerCase()) ||
        item.matakuliah.kode.toLowerCase().includes(value.toLowerCase()) ||
        item.hari.toLowerCase().includes(value.toLowerCase()) ||
        item.waktu_mulai.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClasses(filtered);
  };

  const steps = [
    {
      target: ".edit-button",
      content: "Klik tombol ini untuk mengedit jadwal kelas.",
    },
    {
      target: ".card",
      content: "Ini adalah kartu kelas, Untuk Melihat Jadwal kelas",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
      <Tour steps={steps} />
      {editingClass && (
        <Modal onClose={() => setEditingClass(null)}>
          <h2 className="text-lg font-semibold">Edit Jadwal Kelas</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Hari
              </label>
              <input
                type="text"
                name="hari"
                value={editingClass.hari}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md text-primary-dark bg-neutral-light"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Waktu Mulai
              </label>
              <input
                type="text"
                name="waktu_mulai"
                value={editingClass.waktu_mulai}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md text-primary-dark bg-neutral-light"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Waktu Selesai
              </label>
              <input
                type="text"
                name="waktu_selesai"
                value={editingClass.waktu_selesai}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md text-primary-dark bg-neutral-light"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ruangan
              </label>
              <select
                name="ruang_id"
                value={editingClass.ruang_id}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md text-primary-dark bg-neutral-light"
              >
                {rooms.map((room) => (
                  <option key={room.ruang_id} value={room.ruang_id}>
                    {room.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                Simpan
              </button>
            </div>
          </form>
        </Modal>
      )}
      <div className="w-full py-2">
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cari mata kuliah, kode, atau hari"
            className="w-full px-4 py-2 border rounded-md text-primary bg-neutral-light"
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((item, index) => (
            <Card
              key={index}
              className={`p-4 flex justify-between ${
                item.studentPresent ? "bg-green-100" : ""
              } card`}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.matakuliah.nama}
                  </h2>
                  <p className="text-[12px]">{item.matakuliah.kode}</p>
                </div>
                {item.studentPresent ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 edit-button"
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <p className="flex items-end">{item.ruangkelas.nama}</p>
                <div>
                  <div className="flex flex-col text-right">
                    <p>{item.hari}</p>
                    <p className="text-[12px]">
                      {item.waktu_mulai} s/d {item.waktu_selesai}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListJadwalKelas;
