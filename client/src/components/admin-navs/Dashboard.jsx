import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [staffData, setStaffData] = useState([]);
    const [roomsData, setRoomsData] = useState([]);
    const [checkedIn, setCheckedIn] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);

    const fetchStaff = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getstaff");
            setStaffData(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchReservationsData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getreservation");
            // console.log(response.data);
            const checkedInReservations = response.data.filter(
            (res) => res.status == "Checked-In"
        )
        setCheckedIn(checkedInReservations)
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getroom");
            // console.log(response.data);
            setRoomsData(response.data);
            const availableRooms = response.data.filter(
            (room) => room.roomStatus == "Available"
        )
        setAvailableRooms(availableRooms)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchStaff();
        fetchReservationsData();
        fetchRooms();
    }, [])

    const data = {
        totalRooms: 120,
        checkedIn: 45,
        emptyRooms: 30,
        totalStaff: 15,
        reservationsToday: 10,
        occupancyRate: "65%",
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-semibold mb-6 text-black">Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Total Rooms */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Total Rooms</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{roomsData.length}</p>
                    </div>

                    {/* Checked In Rooms */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Checked-In Rooms</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{checkedIn.length}</p>
                    </div>

                    {/* Empty Rooms */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Empty Rooms</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{availableRooms.length}</p>
                    </div>

                    {/* Total Staff */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Total Staff</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{staffData.length}</p>
                    </div>

                    {/* Reservations Today */}
                    {/* <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Reservations Today</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{data.reservationsToday}</p>
                    </div> */}

                    {/* Occupancy Rate */}
                    {/* <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Occupancy Rate</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{data.occupancyRate}</p>
                    </div> */}

                </div>
            </div>
        </>
    )
}

export default Dashboard
