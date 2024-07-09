import HeaderCard from "@components/atoms/HeaderCard";
import RiwayatRekapPresensi from "@components/molecules/RiwayatRekapPresensi";

const RiwayatKelasTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Riwayat Kelas
        </h1>
      </HeaderCard>
      <RiwayatRekapPresensi />
    </div>
  );
};

export default RiwayatKelasTemp;
