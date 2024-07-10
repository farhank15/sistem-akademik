import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Doodle from "@assets/images/doodle.png";
import supabase from "@/client/supabase";

const CardName = () => {
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState(null);

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
      fetchUserName(userId);
    }
  }, [userId]);

  const fetchUserName = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Gagal mengambil nama pengguna:", error.message);
      } else {
        setFullName(data.full_name);
      }
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error.message);
    }
  };

  return (
    <div
      className="relative flex items-center h-40 p-4 rounded-lg shadow-lg bg-accent-light"
      style={{
        backgroundImage: `url(${Doodle})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col px-5 text-white">
        <h1 className="z-10 text-2xl font-bold md:text-5xl">
          Selamat {fullName}
        </h1>
        <p className="z-10 text-lg ">21450410030</p>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default CardName;
