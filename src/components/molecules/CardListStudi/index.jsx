import Card from "@components/atoms/Card";
import { FaCheck } from "react-icons/fa"; // Import icon dari React Icons

const CardListStudi = ({ course, isSelected, onClick }) => {
  return (
    <Card
      className={`p-2 pt-4 cursor-pointer relative ${
        isSelected ? "border border-green-500" : "border border-primary"
      }`}
      onClick={onClick}
    >
      {isSelected && ( // Tampilkan logo centang jika isSelected true
        <div className="absolute z-30 top-2 left-2">
          <FaCheck className="w-6 h-5 text-success" />
        </div>
      )}
      <div className="absolute w-[5rem] rounded-full bg-accent top-2 right-2">
        <p className="text-[12px] py-1 text-center">12 dari 20</p>
      </div>
      <div className="absolute w-5 h-5 rounded-full bg-slate-300 opacity-20 top-2 left-2"></div>
      <div className="mt-5">
        <h3 className="text-xl font-semibold w-80">{course.name}</h3>
        <p className="text-[12px] text-gray-300">Kode: {course.code}</p>
        <p className="text-[12px] text-gray-300">SKS: {course.sks}</p>
        <p className="text-[12px] text-gray-300 absolute bottom-2 right-2">
          Semester: {course.semester}
        </p>
      </div>
    </Card>
  );
};

export default CardListStudi;
