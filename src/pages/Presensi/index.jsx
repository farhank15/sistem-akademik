import PresensiTemp from "@components/Templates/PresensiTemp";
import { Helmet } from "react-helmet-async";

const Presensi = () => {
  return (
    <div>
      <Helmet>
        <title>Presensi | Sistem Akademik</title>
      </Helmet>
      <PresensiTemp />
    </div>
  );
};

export default Presensi;
