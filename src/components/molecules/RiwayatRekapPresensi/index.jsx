import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Card from "@components/atoms/Card";
import supabase from "@/client/supabase";
import moment from "moment-timezone";
import "moment/locale/id";
import Swal from "sweetalert2";
import Dotnav from "@components/atoms/Dotnav";

const RiwayatRekapPresensi = () => {
  const [presensi, setPresensi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPresensi();
    }
  }, [userId]);

  const fetchPresensi = async () => {
    try {
      const { data, error } = await supabase
        .from("riwayatpresensi")
        .select(
          `
          *,
          jadwal_kelas:jadwalkelas (
            mata_kuliah:matakuliah(nama),
            waktu_selesai
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal mengambil riwayat presensi:", error.message);
        return;
      }

      setPresensi(data || []);
      fetchLocations(data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async (presensi) => {
    const locationPromises = presensi.map(async (item) => {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${item.latitude}&lon=${item.longitude}`
      );
      return {
        id: item.id,
        address: response.data.display_name || "Alamat tidak ditemukan",
      };
    });

    const locationsData = await Promise.all(locationPromises);
    const locationsMap = locationsData.reduce((acc, loc) => {
      acc[loc.id] = loc.address;
      return acc;
    }, {});

    setLocations(locationsMap);
  };

  const handleDelete = async (item) => {
    const kelasSelesai = moment().isAfter(
      moment(item.jadwal_kelas.waktu_selesai, "HH:mm:ss")
    );

    if (!kelasSelesai) {
      Swal.fire({
        icon: "warning",
        title: "Tidak Diperbolehkan",
        text: "Anda tidak dapat menghapus presensi sebelum kelas selesai!",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase
          .from("riwayatpresensi")
          .delete()
          .eq("id", item.id);

        if (error) {
          throw error;
        }

        // Hapus item dari state lokal setelah berhasil dihapus dari database
        setPresensi(
          presensi.filter((presensiItem) => presensiItem.id !== item.id)
        );

        Swal.fire("Dihapus!", "Item telah dihapus.", "success");
      } catch (error) {
        console.error("Gagal menghapus data:", error.message);
        Swal.fire("Error!", "Gagal menghapus item.", "error");
      }
    }
  };

  const handleDetail = (id) => {
    // Implementasikan logika detail di sini
    alert(`Detail item dengan id: ${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-2">
      {presensi.length === 0 ? (
        <div className="text-gray-600">Belum ada riwayat presensi.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {presensi.map((item, index) => (
            <Card key={index} className="relative p-4">
              <div className="absolute top-2 right-2">
                <Dotnav
                  menuItems={[
                    { label: "Hapus", onClick: () => handleDelete(item) },
                    { label: "Detail", onClick: () => handleDetail(item.id) },
                  ]}
                />
              </div>
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold w-[80%]">
                  {item.jadwal_kelas.mata_kuliah.nama}
                </h2>
              </div>
              <div className="flex items-end w-[90%] md:w-[80%] text-primary-light justify-between">
                <div className="text-[12px] font-medium">
                  <p>{locations[item.id] || "Mencari alamat..."}</p>
                </div>
              </div>
              <div>
                <p className="self-end mt-2 text-sm text-gray-500 text-end">
                  {moment(item.created_at).format("LLL")}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiwayatRekapPresensi;
