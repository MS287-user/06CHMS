// src/components/SideNavbar.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCartIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  SparklesIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  FolderIcon,
  CubeIcon,
  ChatBubbleLeftEllipsisIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { MegaphoneIcon, UserCircleIcon } from "lucide-react";

const SideNavbar = ({ logoutUser }) => {
  const location = useLocation();

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-64 bg-white h-screen border-r p-4 flex flex-col overflow-y-auto">
      <div className="text-2xl font-bold text-gray-800 mb-6 px-2">
        LuxuryStay
      </div>

      {/* ADMIN SECTION */}

      {loggedUser.role == "Admin" || loggedUser.role == "Manager" ?

      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-400 px-2 mb-2">
          ADMIN/MANAGER
        </h2>
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ChartBarIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/staff"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/staff"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ShoppingCartIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Staff</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/rooms"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/rooms"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <RocketLaunchIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Rooms</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/reservation"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/reservation"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ClipboardDocumentListIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Reservations</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/checkinout"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/checkinout"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <CalendarDaysIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Check-In/Out</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/billing"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/billing"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Billing</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/housekeeping"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/housekeeping"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <SparklesIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Housekeeping</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/maintainance"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/maintainance"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <UserGroupIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Maintenance</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/analytics"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/analytics"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ChartBarIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/settings"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <FolderIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      : ""}

      {/* STAFF SECTION */}

      {loggedUser.role == "Receptionist" ?

      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-400 px-2 mb-2">
          RECEPTIONIST
        </h2>
        <ul>
          <li>
            <Link
              to="/dashboard/staff/reservations"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/staff/reservations"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ClipboardDocumentListIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Reservations</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/staff/checkinout"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/staff/checkinout"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <CalendarDaysIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Check-In/Out</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/staff/roomstatus"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/staff/roomstatus"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <CubeIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Rooms Status</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/staff/maintainancerequest"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/staff/maintainancerequest"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <UserGroupIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Maintenance Requests</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/staff/profile"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/staff/profile"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <UserCircleIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>

      : ""}

      {/* GUEST SECTION */}

      { loggedUser.role == "Housekeeper" ? 

      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-400 px-2 mb-2">
          GUEST
        </h2>
        <ul>
          <li>
            <Link
              to="/dashboard/guest/bookings"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/guest/bookings"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ClipboardDocumentListIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>My Bookings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/guest/profile"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/guest/profile"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <UserCircleIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/guest/feedback"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/guest/feedback"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <MegaphoneIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Feedback</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/guest/servicerequest"
              className={`flex items-center px-2 py-2 rounded-md text-sm ${location.pathname === "/dashboard/guest/servicerequest"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Services Request</span>
            </Link>
          </li>
        </ul>
      </div>

      : ""}

      {/* OTHER SECTION */}
      {/* <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-400 px-2 mb-2">Other</h2>
        <ul>
          <li>
            <button
              className={`flex items-center px-2 py-2 rounded-md text-sm bg-gray-200 text-gray-900 font-semibold`}
              onClick={logoutUser}
            >
              <UserCircleIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default SideNavbar;