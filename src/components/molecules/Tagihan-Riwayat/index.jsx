import Card from "@components/atoms/Card";

const TagihanRiwayat = () => {
  const tagihanData = [
    {
      tahunSemester: "2023 Genap",
      namaTagihan: "KKN",
      jumlahTagihan: 750000,
      jumlahBayar: 750000,
      status: "Lunas",
    },
    {
      tahunSemester: "2023 Ganjil",
      namaTagihan: "Kemahasiswaan",
      jumlahTagihan: 150000,
      jumlahBayar: 150000,
      status: "Lunas",
    },
  ];

  const riwayatData = [
    {
      tahunSemester: "2023 Genap",
      keterangan: "KKN",
      jumlahBayar: 750000,
      tanggal: "07-06-2024",
    },
    {
      tahunSemester: "2023 Ganjil",
      keterangan: "Kemahasiswaan",
      jumlahBayar: 150000,
      tanggal: "19-09-2023",
    },
  ];

  const calculateTotalTagihan = () => {
    return tagihanData.reduce((total, item) => total + item.jumlahTagihan, 0);
  };

  const calculateTotalBayar = () => {
    return tagihanData.reduce((total, item) => total + item.jumlahBayar, 0);
  };

  const totalTagihan = calculateTotalTagihan();
  const totalBayar = calculateTotalBayar();
  const sisaSaldo = totalTagihan - totalBayar;

  return (
    <div className="container mx-auto mt-2">
      <Card className="p-4 mb-8 tagihan-table">
        <h2 className="mb-4 text-2xl font-bold text-center text-secondary-light">
          Tagihan Pembayaran
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-lg cursor-pointer bg-neutral-dark">
            <thead className="bg-accent-dark text-secondary-light">
              <tr>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[120px]">
                  No
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[150px]">
                  Tahun/Semester
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[200px]">
                  Keterangan
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[180px]">
                  Jumlah Tagihan
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[180px]">
                  Jumlah Bayar
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[100px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-neutral-light">
              {tagihanData.map((item, index) => (
                <tr key={index} className="hover:bg-neutral">
                  <td className="px-6 py-4 border-b border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    {item.tahunSemester}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    {item.namaTagihan}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    Rp {item.jumlahTagihan.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    Rp {item.jumlahBayar.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-bold border-b border-gray-700 text-success">
                    {item.status}
                  </td>
                </tr>
              ))}
              <tr className="bg-primary-dark">
                <td
                  colSpan="3"
                  className="px-6 py-4 font-bold border-b border-gray-700"
                >
                  Total
                </td>
                <td className="px-6 py-4 font-bold border-b border-gray-700">
                  Rp {totalTagihan.toLocaleString()}
                </td>
                <td className="px-6 py-4 font-bold border-b border-gray-700">
                  Rp {totalBayar.toLocaleString()}
                </td>
                <td className="px-6 py-4 border-b border-gray-700"></td>
              </tr>
              <tr className="bg-primary-dark">
                <td
                  colSpan="4"
                  className="px-6 py-4 font-bold border-b border-gray-700"
                >
                  Sisa Saldo
                </td>
                <td
                  colSpan="2"
                  className="px-6 py-4 font-bold border-b border-gray-700"
                >
                  Rp {sisaSaldo.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4 riwayat-table">
        <h2 className="mb-4 text-2xl font-bold text-center text-secondary-light">
          Riwayat Pembayaran
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-lg cursor-pointer bg-neutral-dark">
            <thead className="bg-success text-primary-dark">
              <tr>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[120px]">
                  No
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[150px]">
                  Tahun/Semester
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[200px]">
                  Keterangan
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[180px]">
                  Jumlah Bayar
                </th>
                <th className="px-6 py-3 text-left border-b border-gray-700 min-w-[150px]">
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody className="text-neutral-light">
              {riwayatData.map((item, index) => (
                <tr key={index} className="hover:bg-neutral">
                  <td className="px-6 py-4 border-b border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    {item.tahunSemester}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    {item.keterangan}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    Rp {item.jumlahBayar.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    {item.tanggal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TagihanRiwayat;
