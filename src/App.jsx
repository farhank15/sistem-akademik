import Appshell from "@components/molecules/Appshell";
import AmbilKrs from "@pages/AmbilKrs";
import Beranda from "@pages/Beranda";
import Evaluasi from "@pages/Evaluasi";
import JadwalUjian from "@pages/JadwalUjian";
import KartuUjian from "@pages/KartuUjian";
import KhsMahasiswa from "@pages/KhsMahasiswa";
import LoginForm from "@pages/LoginForm";
import Pembayaran from "@pages/Pembayaran";
import Presensi from "@pages/Presensi";
import Profile from "@pages/Profile";
import RevisiKrs from "@pages/RevisiKrs";
import Transkrip from "@pages/Transkrip";
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
        <Route path="/transkrip" element={<Transkrip />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/jadwal-ujian" element={<JadwalUjian />} />
        <Route path="/kusioner-evaluasi" element={<Evaluasi />} />
      </Routes>
    </Appshell>
  );
}

export default App;
