import HeaderCard from "@components/atoms/HeaderCard";
import ListKhsMahasiswa from "@components/molecules/ListKhsMahasiswa";

const KhsMahasiswaTemp = () => {
  return (
    <div className="my-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Kartu Hasil Studi
        </h1>
      </HeaderCard>
      <ListKhsMahasiswa />
    </div>
  );
};

export default KhsMahasiswaTemp;
