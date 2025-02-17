import BerandaTemp from "@components/Templates/BerandaTemp";
import { Helmet } from "react-helmet-async";

const Beranda = () => {
  return (
    <div>
      <Helmet>
        <title>Beranda | Sistem Akademik</title>
      </Helmet>
      <div>
        <BerandaTemp />
      </div>
    </div>
  );
};

export default Beranda;
