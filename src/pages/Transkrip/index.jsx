import TranskripTemp from "@components/Templates/TranskripTemp";
import { Helmet } from "react-helmet-async";

const Transkrip = () => {
  return (
    <div>
      <Helmet>
        <title>Transkrip | Sistem Akademik</title>
      </Helmet>
      <TranskripTemp />
    </div>
  );
};

export default Transkrip;
