import RiwayatKelasTemp from "@components/Templates/RiwayatKelasTemp";
import { Helmet } from "react-helmet-async";

const RiwayatKelas = () => {
  return (
    <div>
      <Helmet>
        <title>Riwayat-Kelas | Sistem Akademik</title>
      </Helmet>
      <RiwayatKelasTemp />
    </div>
  );
};

export default RiwayatKelas;
