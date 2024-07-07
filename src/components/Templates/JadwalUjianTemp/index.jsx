import HeaderCard from "@components/atoms/HeaderCard";
import DaftarJadwalUjian from "@components/molecules/Daftar-Jadwal-Ujian";

const JadwalUjianTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Jadwal Ujian
        </h1>
      </HeaderCard>
      <DaftarJadwalUjian />
    </div>
  );
};

export default JadwalUjianTemp;
