import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import AvatarMol from "@components/atoms/Avatar";
import Cookies from "js-cookie"; // Import js-cookie
import NavbarMahasiswa from "../NavbarMahasiswa";
import NavbarDosen from "../NavbarDosen"; // Import NavbarDosen

const Appshell = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // State untuk menyimpan peran pengguna

  useEffect(() => {
    const token = Cookies.get("user_session");
    if (token) {
      setIsLoggedIn(true);
      // Asumsi: token menyimpan informasi peran pengguna di payload JWT
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode payload token
      setUserRole(payload.role); // Ambil peran pengguna dari payload
    }
  }, []);

  const disableShortcuts = (event) => {
    // List of key combinations that should be disabled
    const disabledKeys = [
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "Control+R",
      "Control+Shift+R",
      "Control+T",
      "Control+Shift+T",
      "Control+W",
      "Control+Shift+W",
      "Control+N",
      "Control+Shift+N",
      "Control+P",
      "Control+Shift+P",
      "Control+S",
      "Control+Shift+S",
      "Control+F",
      "Control+G",
      "Control+H",
      "Control+J",
      "Control+K",
      "Control+L",
      "Control+Shift+L",
      "Control+Q",
      "Control+Shift+Q",
      "Control+U",
      "Control+Shift+U",
      "Control+M",
      "Control+Shift+M",
      "Control+B",
      "Control+Shift+B",
      "Control+D",
      "Control+Shift+D",
      "Control+Shift+C",
      "Control+Shift+J",
    ];

    const pressedKey = event.key;
    const isControlPressed = event.ctrlKey || event.metaKey;
    const isShiftPressed = event.shiftKey;
    const keyCombination = `${isControlPressed ? "Control+" : ""}${
      isShiftPressed ? "Shift+" : ""
    }${pressedKey}`;

    if (disabledKeys.includes(keyCombination)) {
      event.preventDefault();
    }
  };

  const disableContextMenu = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("keydown", disableShortcuts);
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("keydown", disableShortcuts);
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <Router>
      {isLoggedIn && <AvatarMol />}
      <div className="px-4 m-auto font-poppins max-w-7xl">
        <HelmetProvider>{children}</HelmetProvider>
      </div>
      {isLoggedIn && userRole === "mahasiswa" && <NavbarMahasiswa />}
      {isLoggedIn && userRole === "dosen" && <NavbarDosen />}
    </Router>
  );
};

export default Appshell;
