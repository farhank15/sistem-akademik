import { Link } from "react-router-dom";

const BantuanSistem = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Halaman Bantuan</h1>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="font-semibold">
            Bagaimana cara mengubah profil saya?
          </h3>
          <p className="mb-4">
            Untuk mengubah profil Anda, silakan klik pada avatar di pojok kanan
            atas, lalu pilih "Pengaturan Profil".
          </p>
          <h3 className="font-semibold">Bagaimana cara logout?</h3>
          <p className="mb-4">
            Untuk logout, klik pada avatar di pojok kanan atas, lalu pilih
            "Logout".
          </p>
          <h3 className="font-semibold">Bagaimana cara mengajukan KRS?</h3>
          <p className="mb-4">
            Untuk mengajukan KRS, masuk ke halaman "Ambil KRS" dan pilih mata
            kuliah yang ingin Anda ambil.
          </p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Kontak Kami</h2>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4">
            Jika Anda membutuhkan bantuan lebih lanjut, Anda dapat menghubungi
            kami melalui:
          </p>
          <p className="mb-2">
            <strong>Email:</strong> support@up45.ac.id
          </p>
          <p className="mb-2">
            <strong>Telepon:</strong> +62 123 456 7890
          </p>
          <p className="mb-2">
            <strong>Alamat:</strong> Jl. Kamboja No.1, Yogyakarta, Indonesia
          </p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Panduan Pengguna</h2>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4">
            Anda dapat mengunduh panduan pengguna untuk informasi lebih lanjut
            tentang penggunaan aplikasi.
          </p>
          <Link to="/user-guide" className="text-blue-500 underline">
            Unduh Panduan Pengguna
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BantuanSistem;
