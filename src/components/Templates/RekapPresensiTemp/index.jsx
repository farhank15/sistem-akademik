import HeaderCard from "@components/atoms/HeaderCard";
import BeritaAcara from "@components/molecules/BeritaAcara";

const RekapPresensiTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Rekap Presensi
        </h1>
      </HeaderCard>
      <BeritaAcara />
    </div>
  );
};

export default RekapPresensiTemp;
