import HeaderCard from "@components/atoms/HeaderCard";
import Pembimbing from "@components/molecules/Pembimbing";

const PembimbingAkademikTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Pembimbing Akademik
        </h1>
      </HeaderCard>
      <Pembimbing />
    </div>
  );
};

export default PembimbingAkademikTemp;
