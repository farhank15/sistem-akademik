import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import supabase from "@/client/supabase";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getRandomAvatar } from "@components/atoms/RandomAvatars";

const AvatarMol = ({ avatarUrl }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dospem, setDospem] = useState(null);
  const [userId, setUserId] = useState(null);
  const cardRef = useRef(null);
  const avatarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      cardRef.current &&
      !cardRef.current.contains(event.target) &&
      avatarRef.current &&
      !avatarRef.current.contains(event.target)
    ) {
      setIsCardOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("selectedAvatar");
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    } else {
      const newAvatar = getRandomAvatar();
      localStorage.setItem("selectedAvatar", newAvatar);
      setSelectedAvatar(newAvatar);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id || decodedToken.sub;
        setUserId(userId);
        fetchUserData(userId);
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", userId)
        .single();

      if (profileError) {
        throw profileError;
      }

      let profileData;
      if (userProfile.role === "mahasiswa") {
        const { data, error } = await supabase
          .from("profil_mahasiswa")
          .select("nama, email, profil_mahasiswa_id")
          .eq("user_id", userProfile.id)
          .single();

        if (error) {
          throw error;
        }
        profileData = { ...data, role: userProfile.role }; // Adding role to profileData

        await fetchDospemData(profileData.profil_mahasiswa_id);
      } else if (userProfile.role === "dosen") {
        const { data, error } = await supabase
          .from("profil_dosen")
          .select("nama, email")
          .eq("user_id", userProfile.id)
          .single();

        if (error) {
          throw error;
        }
        profileData = { ...data, role: userProfile.role }; // Adding role to profileData
      } else {
        throw new Error("Peran pengguna tidak dikenal");
      }

      setUserData(profileData);
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error.message);
    }
  };

  const fetchDospemData = async (mahasiswaId) => {
    try {
      const { data: dospemData, error: dospemError } = await supabase
        .from("dosen_dospem")
        .select("dosen_id")
        .eq("mahasiswa_id", mahasiswaId)
        .eq("status", "Aktif")
        .single();

      if (dospemError) {
        throw dospemError;
      }

      const { data: dosenProfile, error: dosenProfileError } = await supabase
        .from("profil_dosen")
        .select("nama")
        .eq("profil_dosen_id", dospemData.dosen_id)
        .single();

      if (dosenProfileError) {
        throw dosenProfileError;
      }

      setDospem(dosenProfile.nama);
    } catch (error) {
      console.error("Gagal mengambil data dospem:", error.message);
    }
  };

  const handleAvatarClick = () => {
    setIsCardOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout gagal", error);
      } else {
        Cookies.remove("user_session");
        localStorage.removeItem("selectedAvatar");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saat logout", error);
    }
  };

  const handleSettingsClick = () => {
    setIsCardOpen(false);
  };

  return (
    <div className="fixed z-50 top-4 right-4">
      <div
        ref={avatarRef}
        className="cursor-pointer avatar"
        onClick={handleAvatarClick}
      >
        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={
              avatarUrl || selectedAvatar || "https://via.placeholder.com/150"
            }
            alt="Avatar"
          />
        </div>
      </div>

      {isCardOpen && userData && (
        <div
          ref={cardRef}
          className="absolute right-0 z-50 p-4 mt-2 bg-white rounded-lg shadow-lg w-72"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full">
              <img
                src={
                  avatarUrl ||
                  selectedAvatar ||
                  "https://via.placeholder.com/150"
                }
                alt="Avatar"
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="text-[16px] text-neutral-dark font-semibold">
                {userData.nama}
              </h2>
              <p className="text-[12px] text-neutral">{userData.email}</p>
              {userData.role === "mahasiswa" && dospem && (
                <p className="text-[12px] text-neutral">{dospem}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Link
              to={`/profile-setting/${userId}`}
              className="flex items-center justify-start w-full space-x-2 text-neutral btn btn-outline hover:text-neutral-light hover:bg-primary-light"
              onClick={handleSettingsClick}
            >
              <FontAwesomeIcon icon={faCog} />
              <span>Pengaturan Profil</span>
            </Link>
            <button
              className="flex items-center justify-start w-full mt-2 space-x-2 text-neutral hover:text-neutral-light btn btn-outline hover:bg-accent-dark"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarMol;
