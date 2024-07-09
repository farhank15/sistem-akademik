import React, { useState, useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";

const Dotnav = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="p-2 transition-transform duration-300 hover:scale-105"
      >
        <FiMoreVertical size={36} />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
          {menuItems.map((item, index) => (
            <div key={index} className="py-1">
              <button
                onClick={item.onClick}
                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200"
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dotnav;
