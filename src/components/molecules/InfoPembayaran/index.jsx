import Card from "@components/atoms/Card";
import LogoBNI from "@assets/logos/Bank-BNI.png";
import LogoMandiri from "@assets/logos/Bank-Mandiri.png";

const InfoPembayaran = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-2 text-lg font-bold md:text-xl virtual-account">
            Nomor Virtual Akun Mahasiswa:
          </h2>
          <p className="mb-4 text-sm text-accent-light md:text-lg">
            Virtual Akun BNI : 9883465721451030
          </p>
          <h2 className="mb-2 text-lg font-bold md:text-xl jumlah-tagihan">
            Jumlah Tagihan Anda Sekarang:
          </h2>
          <p className="mb-4 text-accent-light">Rp. 0</p>
        </Card>
        <Card>
          <div className="flex flex-col items-center p-4 download-guides">
            <h2 className="mb-4 text-lg font-bold text-center md:text-xl ">
              Download Panduan Pembayaran
            </h2>
            <div className="flex items-end gap-2 ">
              <a
                href="https://siakad.up45.ac.id/file/BNI-Pembayaran.pdf"
                className="flex items-center justify-center h-16 px-4 py-3 mb-4 text-white transition-transform duration-500 rounded-lg hover:scale-105 bg-neutral-light "
              >
                <img src={LogoBNI} alt="Logo BNI" className="w-24 " />
              </a>
              <a
                href="https://siakad.up45.ac.id/file/VA-Mandiri.pdf"
                className="flex items-center justify-center h-16 px-4 py-3 mb-4 text-white transition-transform duration-500 rounded-lg hover:scale-105 bg-neutral-light"
              >
                <img src={LogoMandiri} alt="Logo Mandiri" className="w-24" />
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InfoPembayaran;
