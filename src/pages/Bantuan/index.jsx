import BantuanTemp from "@components/Templates/BantuanTemp";
import BerandaTemp from "@components/Templates/BerandaTemp";
import { Helmet } from "react-helmet-async";

const Bantuan = () => {
  return (
    <div>
      <Helmet>
        <title>Bantuan | Sistem Akademik</title>
      </Helmet>
      <div>
        <BantuanTemp />
      </div>
    </div>
  );
};

export default Bantuan;
