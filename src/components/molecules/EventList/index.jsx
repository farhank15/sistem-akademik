const events = [
  {
    color: "bg-green-500",
    title: "Pembayaran I SPP & Pendaftaran Ulang",
    date: "01-12-2023 s/d 09-03-2024",
  },
  {
    color: "bg-teal-400",
    title: "Pembayaran II SPP",
    date: "01-12-2023 s/d 13-07-2024",
  },
  {
    color: "bg-blue-400",
    title: "Pengisian KRS & Bimbingan KRS",
    date: "26-02-2024 s/d 16-03-2024",
  },
  {
    color: "bg-yellow-400",
    title: "PKKMB Maba",
    date: "09-03-2024 s/d 09-03-2024",
  },
  {
    color: "bg-blue-700",
    title: "Kuliah Sebelum Ujian Tengah Semester",
    date: "11-03-2024 s/d 04-04-2024",
  },
  {
    color: "bg-yellow-500",
    title: "Ujian Tengah Semester",
    date: "06-05-2024 s/d 18-05-2024",
  },
  {
    color: "bg-indigo-500",
    title: "Kuliah Setelah Ujian Tengah Semester",
    date: "19-05-2024 s/d 28-06-2024",
  },
];

const EventList = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-h-[494px]">
      <h3 className="mb-4 text-2xl font-bold text-primary">Keterangan</h3>
      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 rounded-lg shadow-sm bg-gray-50"
          >
            <div className={`w-4 h-4 rounded-full mr-4 ${event.color}`}></div>
            <div>
              <h4 className="text-[14px] font-medium">{event.title}</h4>
              <p className="text-[12px] text-gray-600">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
