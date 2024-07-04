import LoginFormTemp from "@components/Templates/LoginFormTemp";
import Appshell from "@components/molecules/Appshell";
import Beranda from "@pages/Beranda";
import Profile from "@pages/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Appshell>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<LoginFormTemp />} />
        <Route path="/profile-setting" element={<Profile />} />
      </Routes>
    </Appshell>
  );
}

export default App;
