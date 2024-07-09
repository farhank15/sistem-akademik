import AccKrsTemp from "@components/Templates/AccKrsTemp";
import { Helmet } from "react-helmet-async";

const AccKrs = () => {
  return (
    <div>
      <Helmet>
        <title>Acc - Krs | Sistem Akademik</title>
      </Helmet>
      <div>
        <AccKrsTemp />
      </div>
    </div>
  );
};

export default AccKrs;
