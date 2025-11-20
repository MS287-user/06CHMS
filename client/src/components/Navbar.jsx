import React from 'react'
import { Link, Links } from "react-router-dom";

const Navbar = ({ logoutUser }) => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
                <div className="flex items-center gap-3">
                    <img src="https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/bluebirdlogo.png" className="w-12" alt="logo" />
                    <p className="text-2xl font-bold text-blue-600">LUXURY STAY</p>
                </div>

                <ul className="flex items-center gap-6 font-medium text-gray-700">
                    <Link to={'/'}>Home</Link>
                    <a href="#secondsection">Rooms</a>
                    <a href="#thirdsection">Facilities</a>
                    {loggedUser?.role == "Guest" ?
                        <Link to={'/dashboard/guest/bookings'}>Dashboard</Link>
                        :
                        loggedUser ?
                        <Link to={'/dashboard'}>Dashboard</Link>
                        :
                        ""
                    }
                    {loggedUser ?
                        <button onClick={logoutUser} className="px-4 py-1 bg-red-500 text-white rounded-lg">
                            Logout
                        </button>
                        :
                        <Link to={"/login"} className="px-4 py-1 bg-blue-500 text-white rounded-lg">
                            Login
                        </Link>
                    }
                </ul>
            </nav>
        </>
    )
}

export default Navbar