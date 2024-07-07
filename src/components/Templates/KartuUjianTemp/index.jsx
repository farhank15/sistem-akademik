import HeaderCard from "@components/atoms/HeaderCard";
import CetakKartuUjian from "@components/molecules/CetakKartuUjian";

const KartuUjianTemp = () => {
  return (
    <div className="my-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Kartu Ujian
        </h1>
      </HeaderCard>
      <CetakKartuUjian />
    </div>
  );
};

export default KartuUjianTemp;
