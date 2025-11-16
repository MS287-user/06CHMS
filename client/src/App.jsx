// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Staff from "./components/admin-navs/Staff";
import Rooms from "./components/admin-navs/Rooms";
import Dashboard from "./components/admin-navs/Dashboard";
import Reservation from "./components/admin-navs/Reservation";
import CheckInOut from "./components/admin-navs/CheckInOut";
import Billing from "./components/admin-navs/Billing";
import Housekeeping from "./components/admin-navs/Housekeeping";
import Maintainance from "./components/admin-navs/Maintainance";
import Analytics from "./components/admin-navs/Analytics";
import Settings from "./components/admin-navs/Settings";
import AddStaff from "./components/admin-navs/AddStaff";
import AddRoom from "./components/admin-navs/AddRoom";
import AddReservation from "./components/admin-navs/AddReservation";
import AddCheckInOut from "./components/admin-navs/AddCheckInOut";
import GenerateInvoice from "./components/admin-navs/GenerateInvoice";
import AddNewTask from "./components/admin-navs/AddNewTask";
import AddNewRequest from "./components/admin-navs/AddNewRequest";
import StaffReservation from "./components/staff-navs/StaffReservation";
import ReservationDetails from "./components/staff-navs/ReservationDetails";
import StaffCheckInOut from "./components/staff-navs/StaffCheckInOut";
import StaffAddCheckinout from "./components/staff-navs/StaffAddCheckinout";
import StaffRoomStatus from "./components/staff-navs/StaffRoomStatus";
import UpdateRoomStatus from "./components/staff-navs/UpdateRoomStatus";
import StaffMaintainanceRequest from "./components/staff-navs/StaffMaintainanceRequest";
import AddMaintainanceRequest from "./components/staff-navs/AddMaintainanceRequest";
import StaffProfile from "./components/staff-navs/StaffProfile";
import EditProfile from "./components/staff-navs/EditProfile";
import MyBookings from "./components/guest-navs/MyBookings";
import BookingDetails from "./components/guest-navs/BookingDetails";
import GuestProfile from "./components/guest-navs/GuestProfile";
import EditGuestProfile from "./components/guest-navs/EditGuestProfile";
import GuestFeedback from "./components/guest-navs/GuestFeedback";
import GuestServiceRequest from "./components/guest-navs/GuestServiceRequest";
import Login from "./pages/Login";
import AppLayout from "./AppLayout";
import Register from "./pages/Register";
import { useState } from "react";
import EditReservation from "./components/admin-navs/EditReservation";
import Home from "./pages/Home";

const App = () => {
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem("user") || "");

  const loginUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setLoggedUser(data);
  }

  const logoutUser = () => {
    localStorage.removeItem("user");
    setLoggedUser("");
  }
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            {/* ADMIN ROUTES */}
            <Route path="/" element={ loggedUser ? <AppLayout logoutUser={logoutUser}/> : <Navigate to={"/login"}/> }>
            {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
            <Route path="/dashboard/staff" element={<Staff />} />
            <Route path="/dashboard/rooms" element={<Rooms />} />
            <Route path="/dashboard/reservation" element={<Reservation />} />
            <Route path="/dashboard/checkinout" element={<CheckInOut />} />
            <Route path="/dashboard/billing" element={<Billing />} />
            <Route path="/dashboard/housekeeping" element={<Housekeeping />} />
            <Route path="/dashboard/maintainance" element={<Maintainance />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/staff/addstaff" element={<AddStaff />} />
            <Route path="/dashboard/rooms/addroom" element={<AddRoom />} />
            <Route path="/dashboard/reservation/addreservation" element={<AddReservation />} />
            <Route path="/dashboard/reservation/editreservation/:id" element={<EditReservation />} />
            <Route path="/dashboard/checkinout/addcheckinout" element={<AddCheckInOut />} />
            <Route path="/dashboard/billing/generateinvoice" element={<GenerateInvoice />} />
            <Route path="/dashboard/housekeeping/addnewtask" element={<AddNewTask />} />
            <Route path="/dashboard/maintenance/addnewrequest" element={<AddNewRequest />} />
            
            {/* STAFF ROUTES */}

            <Route path="/dashboard/staff/reservations" element={<StaffReservation />} />
            <Route path="/dashboard/staff/reservations/:id" element={<ReservationDetails />} />
            <Route path="/dashboard/staff/checkinout" element={<StaffCheckInOut />} />
            <Route path="/dashboard/staff/checkinout/addcheckinout" element={<StaffAddCheckinout />} />
            <Route path="/dashboard/staff/roomstatus" element={<StaffRoomStatus />} />
            <Route path="/dashboard/staff/roomstatus/update/:id" element={<UpdateRoomStatus />} />
            <Route path="/dashboard/staff/maintainancerequest" element={<StaffMaintainanceRequest />} />
            <Route path="/dashboard/staff/maintenance/newmaintainancerequest" element={<AddMaintainanceRequest />} />
            <Route path="/dashboard/staff/profile" element={<StaffProfile />} />
            <Route path="/dashboard/staff/profile/editprofile" element={<EditProfile />} />

            {/* GUEST ROUTES */}
            <Route path="/dashboard/guest/bookings" element={<MyBookings />} />
            <Route path="/dashboard/guest/bookings/:id" element={<BookingDetails />} />
            <Route path="/dashboard/guest/profile" element={<GuestProfile />} />
            <Route path="/dashboard/guest/profile/editprofile" element={<EditGuestProfile />} />
            <Route path="/dashboard/guest/feedback" element={<GuestFeedback />} />
            <Route path="/dashboard/guest/servicerequest" element={<GuestServiceRequest />} />

           </Route>


           <Route path="/login" element={<Login loginUser={loginUser} />}></Route>
           <Route path="/register" element={<Register/>}></Route>

          </Routes>
       
    </Router>
  );
};

export default App;
