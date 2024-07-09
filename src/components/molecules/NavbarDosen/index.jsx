import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faClipboardCheck,
  faHistory,
  faUserCheck,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const NavbarDosen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navbarRef = useRef(null);
  const dragHandleRef = useRef(null);
  const startY = useRef(null);
  const [userId, setUserId] = useState(null); // State for user id

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsOpen(false);
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      setIsOpen((prevState) => !prevState);
      event.preventDefault(); // Prevent default spacebar behavior (scrolling)
    }
  };

  const handleTouchStart = (event) => {
    startY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (startY.current - event.touches[0].clientY > 50) {
      setIsOpen(true);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handle = dragHandleRef.current;
    if (handle) {
      handle.addEventListener("touchstart", handleTouchStart);
      handle.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (handle) {
        handle.removeEventListener("touchstart", handleTouchStart);
        handle.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  // Get user id from token
  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.id) {
          setUserId(decodedToken.id); // Extract user ID from token
        } else {
          console.error("User ID tidak ditemukan dalam token");
        }
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    } else {
      console.error("Token tidak ditemukan");
    }
  }, []);

  return (
    <div ref={navbarRef} className="relative z-50">
      <div
        ref={dragHandleRef}
        className={`fixed ${
          isOpen ? "bottom-[215px] md:bottom-[165px]" : "bottom-6"
        } left-1/2 transform -translate-x-1/2 h-2 pb-2 z-40 rounded-full cursor-pointer w-44 opacity-80 bg-neutral transition-all duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <nav
        className={`fixed bottom-0 left-0 right-0 rounded-t-[30px] ${
          isOpen
            ? isExpanded
              ? "h-48 bg-white overflow-y-auto"
              : "h-52 md:h-40 bg-white border-neutral-50 border-2 md:pt-0 overflow-y-auto"
            : "h-4 bg-neutral-light"
        } transition-all duration-300`}
        style={{ maxHeight: isOpen ? "75vh" : "auto" }}
      >
        <div className="container flex items-center justify-center h-full mx-auto">
          {isOpen && (
            <div className="grid w-full grid-cols-3 gap-2 px-2 text-center md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
              <Link
                to={`/jadwal-kelas/${userId}`}
                className="text-primary-dark py-2 text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  size="xl"
                  className="mb-3"
                />
                Jadwal Kelas
              </Link>
              <Link
                to="/acc-krs"
                className="text-primary-dark py-2 text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                  size="xl"
                  className="mb-3"
                />
                ACC KRS
              </Link>
              <Link
                to="/riwayat-kelas"
                className="text-primary-dark py-2 text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faHistory} size="xl" className="mb-3" />
                Riwayat Kelas
              </Link>
              <Link
                to="/presensi-mahasiswa"
                className="text-primary-dark py-2 text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  icon={faUserCheck}
                  size="xl"
                  className="mb-3"
                />
                Presensi Mahasiswa
              </Link>
              <Link
                to="/pembimbing-akademik"
                className="text-primary-dark py-2 text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  size="xl"
                  className="mb-3"
                />
                Pembimbing Akademik
              </Link>
            </div>
          )}
        </div>
        <div
          className={`w-full flex justify-center ${
            isOpen ? "absolute bottom-0" : "h-full"
          } cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen && (
            <div className="w-6 h-1 transition-all duration-300 bg-white rounded-full"></div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarDosen;
