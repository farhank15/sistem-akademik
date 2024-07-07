import HeaderCard from "@components/atoms/HeaderCard";
import PresensiMahasiswa from "@components/molecules/PresensiMahasiswa";

const PresensiTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Presensi Mahasiswa
        </h1>
      </HeaderCard>
      <PresensiMahasiswa />
    </div>
  );
};

export default PresensiTemp;
