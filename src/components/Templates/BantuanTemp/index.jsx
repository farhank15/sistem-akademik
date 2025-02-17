import HeaderCard from "@components/atoms/HeaderCard";
import BantuanSistem from "@components/molecules/BantuanSistem";

const BantuanTemp = () => {
  return (
    <div className="py-16">
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Bantuan
        </h1>
      </HeaderCard>
      <BantuanSistem />
    </div>
  );
};

export default BantuanTemp;
