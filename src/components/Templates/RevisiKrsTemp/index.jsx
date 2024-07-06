import HeaderCard from "@components/atoms/HeaderCard";
import RevisiKrs from "@components/molecules/ListRevisiKrs";

const RevisiKrsTemp = () => {
  return (
    <div className="my-10">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Revisi KRS
        </h1>
      </HeaderCard>
      <RevisiKrs />
    </div>
  );
};

export default RevisiKrsTemp;
