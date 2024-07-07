import HeaderCard from "@components/atoms/HeaderCard";
import InfoPembayaran from "@components/molecules/InfoPembayaran";
import TagihanRiwayat from "@components/molecules/Tagihan-Riwayat";
import Tour from "@components/atoms/Tour";

const PembayaranTemp = () => {
  const steps = [
    {
      target: ".virtual-account",
      content: "Ini adalah nomor virtual akun mahasiswa Anda.",
    },
    {
      target: ".jumlah-tagihan",
      content: "Ini adalah jumlah tagihan Anda saat ini.",
    },
    {
      target: ".download-guides",
      content: "Klik di sini untuk mendownload panduan pembayaran.",
    },
    {
      target: ".tagihan-table",
      content: "Ini adalah daftar tagihan pembayaran Anda.",
    },
    {
      target: ".riwayat-table",
      content: "Ini adalah riwayat pembayaran Anda.",
    },
  ];

  return (
    <div className="my-16">
      <Tour steps={steps} />
      <HeaderCard className="flex justify-center mb-2">
        <h1 className="z-20 text-3xl font-bold text-center md:text-5xl text-neutral-light">
          Pembayaran
        </h1>
      </HeaderCard>
      <InfoPembayaran />
      <TagihanRiwayat />
    </div>
  );
};

export default PembayaranTemp;
