import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Card from "@components/atoms/Card";
import Tour from "@components/atoms/Tour";
import DetailJadwalUjian from "@components/molecules/DetailJadwalUjian";

const DaftarJadwalUjian = () => {
  const initialExams = [
    {
      day: "Senin",
      time: "10:15 s/d 12:45",
      course: "Kerja Praktek",
      code: "TINKFM6023",
      sks: 3,
      semester: "Genap",
      instructor: "Dr. Ir. Budi Santoso",
      room: "Ruang 101",
      examScheduled: false,
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
      examScheduled: false,
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
      examScheduled: false,
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
      examScheduled: false,
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
      examScheduled: false,
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
      examScheduled: false,
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
      examScheduled: false,
    },
  ];

  const [exams, setExams] = useState(initialExams);
  const [showModal, setShowModal] = useState(false);
  const [selectedExamIndex, setSelectedExamIndex] = useState(null);
  const [showTour, setShowTour] = useState(true);

  const steps = [
    {
      target: ".schedule-button",
      content: "Klik tombol ini untuk melihat detail ujian.",
    },
    {
      target: ".card",
      content: "Ini adalah kartu ujian, untuk melihat jadwal ujian.",
    },
  ];

  const markScheduled = (index) => {
    const newExams = [...exams];
    newExams[index].examScheduled = true;
    setExams(newExams);
    setSelectedExamIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExamIndex(null);
  };

  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
      {showTour && <Tour steps={steps} />}
      {showModal && selectedExamIndex !== null && (
        <DetailJadwalUjian
          examDetails={exams[selectedExamIndex]}
          onClose={handleCloseModal}
        />
      )}
      <div className="w-full py-2">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((item, index) => (
            <Card
              key={index}
              className={`p-4 ${item.examScheduled ? "bg-green-100" : ""} card`}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{item.course}</h2>
                  <p className="text-[12px]">{item.instructor}</p>
                </div>
                <button
                  onClick={() => markScheduled(index)}
                  className="text-blue-500 schedule-button"
                >
                  <FaCalendarAlt />
                </button>
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

export default DaftarJadwalUjian;
