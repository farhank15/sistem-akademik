import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../NavbarMol";
import AvatarMol from "@components/atoms/Avatar";

const Appshell = ({ children }) => {
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
      <AvatarMol />
      <div className="m-auto font-poppins max-w-7xl">
        <HelmetProvider>{children}</HelmetProvider>
      </div>
      <Navbar />
    </Router>
  );
};

export default Appshell;
