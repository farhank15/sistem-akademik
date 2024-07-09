import React from "react";
import { Route, Routes } from "react-router-dom";
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
import ProtectedRoute from "./utils/ProtectedRoute";
import JadwalKelas from "@pages/JadwalKelas";

function App() {
  return (
    <Appshell>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <Beranda />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/profile-setting"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/presensi"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <Presensi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ambil-krs"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <AmbilKrs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/revisi-krs"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <RevisiKrs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/khs"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <KhsMahasiswa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kartu-ujian"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <KartuUjian />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transkrip"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <Transkrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pembayaran"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <Pembayaran />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jadwal-ujian"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <JadwalUjian />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kusioner-evaluasi"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <Evaluasi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jadwal-kelas/:id"
          element={
            <ProtectedRoute allowedRoles={["dosen"]}>
              <JadwalKelas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Appshell>
  );
}

export default App;
