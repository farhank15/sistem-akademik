import LoginFormTemp from "@components/Templates/LoginFormTemp";
import { Helmet } from "react-helmet-async";

const LoginForm = () => {
  return (
    <div>
      <Helmet>
        <title>Login | Sistem Akademik</title>
      </Helmet>
      <LoginFormTemp />
    </div>
  );
};

export default LoginForm;
