import HeaderCard from "@components/atoms/HeaderCard";
import ListJadwalKelas from "@components/molecules/ListJadwalKelas";

const JadwalKelasTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Jadwal Kelas
        </h1>
      </HeaderCard>
      <ListJadwalKelas />
    </div>
  );
};

export default JadwalKelasTemp;
