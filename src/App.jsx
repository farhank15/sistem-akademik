import Appshell from "@components/molecules/Appshell";
import Beranda from "@pages/Beranda";
import LoginForm from "@pages/LoginForm";
import Profile from "@pages/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Appshell>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile-setting" element={<Profile />} />
      </Routes>
    </Appshell>
  );
}

export default App;
