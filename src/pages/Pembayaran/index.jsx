import PembayaranTemp from "@components/Templates/PembayaranTemp";
import { Helmet } from "react-helmet-async";

const Pembayaran = () => {
  return (
    <div>
      <Helmet>
        <title>Pembayaran | Sistem Akademik</title>
      </Helmet>
      <PembayaranTemp />
    </div>
  );
};

export default Pembayaran;
