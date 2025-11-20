import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CheckInOut = () => {

    const [reservationsData, setReservationsData] = useState([]);

    const fetchReservationsData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getreservation");
            console.log(response.data);
            setReservationsData(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchReservationsData();
    }, [])

    const handleCheckIn = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/reservationstatuscheckedin/${id}`);
            console.log(response.data);
            fetchReservationsData();
            toast.success(response.data.message);
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleCheckOut = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/reservationstatuscheckedout/${id}`);
            console.log(response.data);
            fetchReservationsData();
            toast.success(response.data.message);
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Guest-In / Guest-Out Management
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        {/* <Link
                            to="/dashboard/checkinout/addcheckinout"
                            className="inline-block mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            New Check-In / Out 
                        </Link> */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Guest Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Room #
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Check-In Date
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Check-Out Date
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reservationsData.map((res) => (
                                        <tr key={res._id}>
                                            <td className="px-4 py-3 text-black">{res.guestId.name}</td>
                                            <td className="px-4 py-3 text-black">{res.roomId.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{new Date(res.checkInDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-black">{new Date(res.checkOutDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-black">{res.status}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                <button onClick={() => handleCheckIn(res._id)} className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                                                    Check-In
                                                </button>
                                                <button onClick={() => handleCheckOut(res._id)} className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                                                    Check-Out
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default CheckInOut
