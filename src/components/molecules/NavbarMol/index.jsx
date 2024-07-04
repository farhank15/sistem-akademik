import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCheckSquare,
  faClipboard,
  faFileAlt,
  faGraduationCap,
  faMoneyBillWave,
  faCalendar,
  faCalendarCheck,
  faClipboardList,
  faLifeRing,
} from "@fortawesome/free-solid-svg-icons";

const NavbarMol = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navbarRef = useRef(null);
  const dragHandleRef = useRef(null);
  const startY = useRef(null);

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

  return (
    <div ref={navbarRef} className="relative">
      <div
        ref={dragHandleRef}
        className={`fixed ${
          isOpen ? "bottom-[390px] md:bottom-[150px]" : "bottom-6"
        } left-1/2 transform -translate-x-1/2 h-2 pb-2 rounded-full cursor-pointer w-44 opacity-80 bg-neutral transition-all duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <nav
        className={`fixed bottom-0 left-0 right-0 rounded-t-[30px] ${
          isOpen
            ? isExpanded
              ? "h-48 bg-white overflow-y-auto"
              : "h-96 md:h-40 bg-white border-neutral-50 border-2 md:pt-0 overflow-y-auto"
            : "h-4 bg-neutral-light"
        } transition-all duration-300`}
        style={{ maxHeight: isOpen ? "75vh" : "auto" }}
      >
        <div className="container flex items-center justify-between h-full mx-auto">
          {isOpen && (
            <div className="grid w-full grid-cols-3 gap-2 px-2 text-center md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12">
              <Link
                to="/"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon icon={faHome} size="xl" className="mb-3" />
                Beranda
              </Link>
              <Link
                to="/presensi"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  size="xl"
                  className="mb-3"
                />
                Presensi
              </Link>
              <Link
                to="/ambil-krs"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon
                  icon={faClipboard}
                  size="xl"
                  className="mb-3"
                />
                Ambil KRS
              </Link>
              <Link
                to="/revisi-krs"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon icon={faFileAlt} size="xl" className="mb-3" />
                Revisi KRS
              </Link>
              <Link
                to="/khs"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="xl"
                  className="mb-3"
                />
                KHS
              </Link>
              <Link
                to="/kartu-ujian"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon icon={faFileAlt} size="xl" className="mb-3" />
                Kartu Ujian
              </Link>
              <Link
                to="/transkrip"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="xl"
                  className="mb-3"
                />
                Transkrip
              </Link>
              <Link
                to="/pembayaran"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  size="xl"
                  className="mb-3"
                />
                Pembayaran
              </Link>
              <Link
                to="/jadwal-kuliah"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon icon={faCalendar} size="xl" className="mb-3" />
                Jadwal Kuliah
              </Link>
              <Link
                to="/jadwal-ujian"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  size="xl"
                  className="mb-3"
                />
                Jadwal Ujian
              </Link>
              <Link
                to="/kusioner-evaluasi"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon
                  icon={faClipboardList}
                  size="xl"
                  className="mb-3"
                />
                Evaluasi
              </Link>
              <Link
                to="/bantuan"
                className="text-primary-dark py-2  text-[12px] hover:shadow-lg hover:rounded-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <FontAwesomeIcon icon={faLifeRing} size="xl" className="mb-3" />
                Bantuan
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

export default NavbarMol;
