import { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import Card from "@components/atoms/Card";
import Modal from "@components/atoms/Modal";
import Tour from "@components/atoms/Tour";

const ListJadwalKelas = () => {
  const initialClasses = [
    {
      day: "Senin",
      time: "10:15 s/d 12:45",
      course: "Kerja Praktek",
      code: "TINKFM6023",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Ir. Budi Santoso",
      room: "Ruang 101",
      studentPresent: false,
    },
    {
      day: "Selasa",
      time: "13:00 s/d 15:30",
      course: "Arsitektur Enterprise",
      code: "TINKFM6013",
      sks: 3,
      semester: "Genap",
      instructor: "Prof. Dr. Siti Aminah",
      room: "Ruang 202",
      studentPresent: false,
    },
    {
      day: "Selasa",
      time: "10:15 s/d 12:45",
      course: "Manajemen Resiko",
      code: "TINKFM6063",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Andi Wijaya",
      room: "Ruang 203",
      studentPresent: false,
    },
    {
      day: "Rabu",
      time: "07:30 s/d 10:00",
      course: "Kriptografi",
      code: "TINKFM6043",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Maya Sari",
      room: "Ruang 204",
      studentPresent: false,
    },
    {
      day: "Rabu",
      time: "13:00 s/d 15:30",
      course: "Manajemen Proyek",
      code: "TINKFM6053",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Joko Susilo",
      room: "Ruang 205",
      studentPresent: false,
    },
    {
      day: "Minggu",
      time: "07:30 s/d 10:00",
      course: "KKN",
      code: "TINKFM6033",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Retno Wulan",
      room: "Ruang 206",
      studentPresent: false,
    },
    {
      day: "Kamis",
      time: "15:45 s/d 18:15",
      course: "Manajemen dan Teknologi Migas (Kapita Selekta Migas)",
      code: "UNKFM6013",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Ahmad Zaini",
      room: "Ruang 207",
      studentPresent: false,
    },
  ];

  const [classes, setClasses] = useState(initialClasses);
  const [filteredClasses, setFilteredClasses] = useState(initialClasses);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (index) => {
    setEditingClass({ ...filteredClasses[index], index });
  };

  const handleSave = () => {
    if (editingClass !== null) {
      const newClasses = [...classes];
      newClasses[editingClass.index] = editingClass;
      setClasses(newClasses);
      setFilteredClasses(newClasses);
      setEditingClass(null);
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
        item.course.toLowerCase().includes(value.toLowerCase()) ||
        item.instructor.toLowerCase().includes(value.toLowerCase()) ||
        item.room.toLowerCase().includes(value.toLowerCase())
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
                name="day"
                value={editingClass.day}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md text-primary-dark bg-neutral-light"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Waktu
              </label>
              <input
                type="text"
                name="time"
                value={editingClass.time}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md text-primary-dark bg-neutral-light"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ruangan
              </label>
              <input
                type="text"
                name="room"
                value={editingClass.room}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md text-primary-dark bg-neutral-light"
              />
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
            placeholder="Cari mata kuliah, dosen, atau ruangan"
            className="w-full px-4 py-2 border rounded-md text-primary bg-neutral-light"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((item, index) => (
            <Card
              key={index}
              className={`p-4 ${
                item.studentPresent ? "bg-green-100" : ""
              } card`}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{item.course}</h2>
                  <p className="text-[12px] ">{item.instructor}</p>
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
                <p className="pt-5">{item.room}</p>
                <div className="text-right">
                  <p>{item.day}</p>
                  <p>{item.time}</p>
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
