import KartuUjianTemp from "@components/Templates/KartuUjianTemp";
import { Helmet } from "react-helmet-async";

const KartuUjian = () => {
  return (
    <div>
      <Helmet>
        <title>Kart-Ujian | Sistem Akademik</title>
      </Helmet>
      <KartuUjianTemp />
    </div>
  );
};

export default KartuUjian;
