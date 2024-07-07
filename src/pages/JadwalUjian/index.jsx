import JadwalUjianTemp from "@components/Templates/JadwalUjianTemp";
import { Helmet } from "react-helmet-async";

const JadwalUjian = () => {
  return (
    <div>
      <Helmet>
        <title>Jadwal-Ujian | Sistem Akademik</title>
      </Helmet>
      <JadwalUjianTemp />
    </div>
  );
};

export default JadwalUjian;
