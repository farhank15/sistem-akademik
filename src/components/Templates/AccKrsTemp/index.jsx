import HeaderCard from "@components/atoms/HeaderCard";
import AccKrsDosen from "@components/molecules/AccKrsDosen";

const AccKrsTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Acc Krs
        </h1>
      </HeaderCard>
      <AccKrsDosen />
    </div>
  );
};

export default AccKrsTemp;
