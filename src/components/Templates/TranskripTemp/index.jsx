import HeaderCard from "@components/atoms/HeaderCard";
import ListTranskripNilai from "@components/molecules/ListTranskripNilai";

const TranskripTemp = () => {
  return (
    <div className="my-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Transkrip
        </h1>
      </HeaderCard>
      <ListTranskripNilai />
    </div>
  );
};

export default TranskripTemp;
