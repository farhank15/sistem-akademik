import HeaderCard from "@components/atoms/HeaderCard";
import DaftarKrs from "@components/molecules/DaftarKrs";

const AmbilKrsTemp = () => {
  return (
    <div className="py-10 ">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Ambil KRS
        </h1>
      </HeaderCard>
      <DaftarKrs />
    </div>
  );
};

export default AmbilKrsTemp;
