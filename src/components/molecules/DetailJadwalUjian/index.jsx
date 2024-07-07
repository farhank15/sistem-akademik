import Modal from "@components/atoms/Modal";

const DetailJadwalUjian = ({ examDetails, onClose }) => {
  const { day, time, course, code, sks, semester, instructor, room } =
    examDetails;

  return (
    <Modal onClose={onClose}>
      <div className="p-4 text-primary">
        <h2 className="text-lg font-semibold">{course}</h2>
        <p className="text-[12px]">{instructor}</p>
        <hr className="my-2" />
        <div className="flex justify-between">
          <div>
            <p>
              <strong>Kode:</strong> {code}
            </p>
            <p>
              <strong>SKS:</strong> {sks}
            </p>
            <p>
              <strong>Semester:</strong> {semester}
            </p>
          </div>
          <div>
            <p>
              <strong>Hari:</strong> {day}
            </p>
            <p>
              <strong>Waktu:</strong> {time}
            </p>
            <p>
              <strong>Ruang:</strong> {room}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailJadwalUjian;
