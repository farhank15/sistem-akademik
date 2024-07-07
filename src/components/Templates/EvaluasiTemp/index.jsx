import HeaderCard from "@components/atoms/HeaderCard";
import LembarEvaluasi from "@components/molecules/LembarEvaluasi";

const EvaluasiTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Evaluasi
        </h1>
      </HeaderCard>
      <LembarEvaluasi />
    </div>
  );
};

export default EvaluasiTemp;
