import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const EditReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roomsData, setRoomsData] = useState([]);
    const [guestName, setGuestName] = useState("");
    const [updateRoomId, setUpdateRoomId] = useState("");
    const [editCheckInDate, setEditCheckInDate] = useState("");
    const [editCheckOutDate, setEditCheckOutDate] = useState("");
    const [totalPrice, setTotalPrice] = useState("");

    const fetchReservationsData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getreservation/${id}`);
            console.log(response.data);
            const { guestId, checkInDate, checkOutDate, totalPrice } = response.data;
            
            const dateIn = checkInDate?.split('T')[0];
            const dateOut = checkOutDate?.split('T')[0];

            setGuestName(guestId.name);
            setEditCheckInDate(dateIn);
            setEditCheckOutDate(dateOut);
            setTotalPrice(totalPrice);
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
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchReservationsData();
        fetchRooms();
    }, [])

    useEffect(() => {
        if (!updateRoomId || !editCheckInDate || !editCheckOutDate) return;

        const selectedRoom = roomsData.find((r) => r._id === updateRoomId);
        if (!selectedRoom) return;

        const checkIn = new Date(editCheckInDate);
        const checkOut = new Date(editCheckOutDate);
        const diffTime = checkOut - checkIn;

        const nights = diffTime / (1000 * 60 * 60 * 24);

        if (nights > 0) {
            const total = nights * Number(selectedRoom.roomPrice);
            setTotalPrice(total.toFixed(2));
        } else {
            setTotalPrice("");
        }
    }, [updateRoomId, editCheckInDate, editCheckOutDate, roomsData]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/updatereservation/${id}`, {
                updateRoomId,
                editCheckInDate,
                editCheckOutDate,
                totalPrice,
            });
            toast.success(response.data.message);
            navigate("/dashboard/reservation");
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Update Reservation
                        </h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Guest Name</label>
                                <input
                                    type="text"
                                    name="guestName"
                                    value={guestName}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Select Room</label>
                                <select
                                    name="roomNumber"
                                    value={updateRoomId}
                                    onChange={(e) => setUpdateRoomId(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="" disabled> Select Available Room </option>
                                    {roomsData.map((room, idx) => (
                                        <option key={idx} value={room._id}>
                                            {room.roomNumber} — {room.roomType} (${room.roomPrice})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Check-In Date</label>
                                    <input
                                        type="date"
                                        name="checkInDate"
                                        value={editCheckInDate}
                                        onChange={(e) => setEditCheckInDate(e.target.value)}
                                        className="w-full border px-3 py-2 rounded text-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">Check-Out Date</label>
                                    <input
                                        type="date"
                                        name="checkOutDate"
                                        value={editCheckOutDate}
                                        onChange={(e) => setEditCheckOutDate(e.target.value)}
                                        className="w-full border px-3 py-2 rounded text-black"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Total Price</label>
                                <input
                                    type="number"
                                    name="totalPrice"
                                    value={totalPrice}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    placeholder="Auto or manual entry"
                                    readOnly
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                            >
                                Update Reservation
                            </button>
                        </form>
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

export default EditReservation