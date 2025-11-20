import React, { useState } from "react";
import { Bell, LogOut, ChevronDown, User } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";

const TopNavbar = ({ logoutUser }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  
  return (
    <div className="w-full bg-white shadow px-6 py-3 flex items-center justify-between sticky top-0 z-30">

      {/* Left: Search  */}
      <div className="flex items-center gap-2 w-full max-w-md">
          {/* Notifications */}
        {/* <button className="relative">
          <Bell className="h-6 w-6 text-gray-600 hover:text-blue-600" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Profile Dropdown */}
        <div className="relative">
          {/* Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
          >
            <span className="font-medium text-gray-700 flex items-center gap-2.5">
              <User /> {loggedUser.name}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform ${open ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 border z-50">

              <button
                onClick={logoutUser}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-2 text-gray-600" />
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
