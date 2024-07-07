import EvaluasiTemp from "@components/Templates/EvaluasiTemp";
import { Helmet } from "react-helmet-async";

const Evaluasi = () => {
  return (
    <div>
      <Helmet>
        <title>kusioner-evaluasi | Sistem Akademik</title>
      </Helmet>
      <div>
        <EvaluasiTemp />
      </div>
    </div>
  );
};

export default Evaluasi;
