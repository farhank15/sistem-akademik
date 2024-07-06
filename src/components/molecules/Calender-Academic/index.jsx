import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarAcademic = () => {
  return (
    <div className="flex flex-col p-4 mx-auto bg-white h-auto rounded-lg shadow-lg md:h-[40rem] lg:flex-row text-primary">
      <div className="w-full mb-4 ">
        <h2 className="mb-4 text-2xl font-semibold text-center lg:text-4xl">
          Kalender Akademik
        </h2>
        <p className="mb-6 text-lg text-center lg:text-xl">
          - Semester Genap 2023/2024 -
        </p>
        <Calendar
          onChange={() => {}}
          value={new Date()}
          className="p-3 m-auto text-lg text-center border-0 lg:w-full"
        />
      </div>
    </div>
  );
};

export default CalendarAcademic;
