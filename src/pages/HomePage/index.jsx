import Button from "@components/atoms/Button";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Helmet>
        <title>Home | Sistem Akademik</title>
      </Helmet>
      <Button
        name="Button"
        className="text-white rounded-lg bg-primary hover:bg-primary-light"
      />
      <h1>haloo</h1>
    </div>
  );
};

export default HomePage;
