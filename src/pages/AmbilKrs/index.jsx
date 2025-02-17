import AmbilKrsTemp from "@components/Templates/AmbilKrsTemp";
import { Helmet } from "react-helmet-async";

const AmbilKrs = () => {
  return (
    <div>
      <Helmet>
        <title>Ambil-KRS | Sistem Akademik</title>
      </Helmet>
      <div>
        <AmbilKrsTemp />
      </div>
    </div>
  );
};

export default AmbilKrs;
