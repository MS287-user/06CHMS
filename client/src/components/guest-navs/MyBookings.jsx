import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const MyBookings = () => {

    const [reservationsData, setReservationsData] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const fetchReservationsData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getreservation");
            const currentGuestBookings = response.data.filter(
                (res) => res.guestId._id == loggedUser._id 
            )
            console.log(currentGuestBookings);
            setReservationsData(currentGuestBookings);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchReservationsData();
    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/deletereservation/${id}`);
            fetchReservationsData();
            toast.success(response.data.message);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">My Bookings</h1>
                    </div>
                    <div className="px-6 py-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Room #</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Check-In</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Check-Out</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                                        {/* <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Action</th> */}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reservationsData.map((res) => (
                                        <tr key={res._id}>
                                            <td className="px-4 py-3 text-black">{res.roomId.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{res.roomId.roomType}</td>
                                            <td className="px-4 py-3 text-black">{new Date(res.checkInDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-black">{new Date(res.checkOutDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-black">{res.status}</td>
                                            <td className="px-4 py-3 text-black">{`$${res.totalPrice}`}</td>
                                            {/* <td className="px-4 py-3">
                                                <button
                                                    onClick={() => navigate(`/guest/bookings/${b.id}`)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                >
                                                    View Details
                                                </button>
                                            </td> */}
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

export default MyBookings
