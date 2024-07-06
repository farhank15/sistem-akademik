import Appshell from "@components/molecules/Appshell";
import AmbilKrs from "@pages/AmbilKrs";
import Beranda from "@pages/Beranda";
import KartuUjian from "@pages/KartuUjian";
import KhsMahasiswa from "@pages/KhsMahasiswa";
import LoginForm from "@pages/LoginForm";
import Presensi from "@pages/Presensi";
import Profile from "@pages/Profile";
import RevisiKrs from "@pages/RevisiKrs";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Appshell>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile-setting" element={<Profile />} />
        <Route path="/presensi" element={<Presensi />} />
        <Route path="/ambil-krs" element={<AmbilKrs />} />
        <Route path="/revisi-krs" element={<RevisiKrs />} />
        <Route path="/khs" element={<KhsMahasiswa />} />
        <Route path="/kartu-ujian" element={<KartuUjian />} />
      </Routes>
    </Appshell>
  );
}

export default App;
