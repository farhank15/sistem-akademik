import RevisiKrsTemp from "@components/Templates/RevisiKrsTemp";
import { Helmet } from "react-helmet-async";
const RevisiKrs = () => {
  return (
    <div>
      <Helmet>
        <title>Revisi-KRS | Sistem Akademik</title>
      </Helmet>
      <RevisiKrsTemp />
    </div>
  );
};

export default RevisiKrs;
