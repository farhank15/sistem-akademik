import RekapPresensiTemp from "@components/Templates/RekapPresensiTemp";
import { Helmet } from "react-helmet-async";

const RekapPresensi = () => {
  return (
    <div>
      <Helmet>
        <title>Rekap-Presensi | Sistem Akademik</title>
      </Helmet>
      <RekapPresensiTemp />
    </div>
  );
};

export default RekapPresensi;
