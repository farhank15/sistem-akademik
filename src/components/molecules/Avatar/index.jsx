import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Avatar = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
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

  const handleAvatarClick = () => {
    setIsCardOpen((prev) => !prev);
  };

  return (
    <div className="fixed z-50 top-4 right-4">
      <div
        ref={avatarRef}
        className="cursor-pointer avatar"
        onClick={handleAvatarClick}
      >
        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://via.placeholder.com/150" alt="Avatar" />
        </div>
      </div>

      {isCardOpen && (
        <div
          ref={cardRef}
          className="absolute right-0 z-50 p-4 mt-2 bg-white rounded-lg shadow-lg w-72"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full">
              <img
                src="https://via.placeholder.com/150"
                alt="Avatar"
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="text-[12px] font-semibold">Ahmad Farhan Kholik</h2>
              <p className="text-[12px] text-gray-600">21450410030</p>
              <p className="font-sans text-[12px] text-gray-600">
                Dr. John Doe
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button className="flex items-center justify-start w-full space-x-2 btn btn-outline btn-primary">
              <FontAwesomeIcon icon={faCog} />
              <span>Pengaturan Profil</span>
            </button>
            <button className="flex items-center justify-start w-full mt-2 space-x-2 btn btn-outline btn-danger">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;