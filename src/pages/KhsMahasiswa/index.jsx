import KhsMahasiswaTemp from "@components/Templates/KhsMahasiswaTemp";
import { Helmet } from "react-helmet-async";

const KhsMahasiswa = () => {
  return (
    <div>
      <Helmet>
        <title>KHS | Sistem Akademik</title>
      </Helmet>
      <KhsMahasiswaTemp />
    </div>
  );
};

export default KhsMahasiswa;
