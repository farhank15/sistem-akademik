import PembimbingAkademikTemp from "@components/Templates/PembimbingAkademikTemp";
import { Helmet } from "react-helmet-async";

const PembimbingAkademik = () => {
  return (
    <div>
      <Helmet>
        <title>Pembimbing - Akademik| Sistem Akademik</title>
      </Helmet>
      <PembimbingAkademikTemp />
    </div>
  );
};

export default PembimbingAkademik;
