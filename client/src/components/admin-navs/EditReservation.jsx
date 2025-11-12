import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const EditReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roomsData, setRoomsData] = useState([]);
    const [editGuestName, setEditGuestName] = useState("");
    const [editGuestEmail, setEditGuestEmail] = useState("");
    const [editGuestPhone, setEditGuestPhone] = useState("");
    const [editRoomNumber, setEditRoomNumber] = useState("");
    const [editCheckInDate, setEditCheckInDate] = useState("");
    const [editCheckOutDate, setEditCheckOutDate] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [editBookingStatus, setEditBookingStatus] = useState("");

    const fetchReservationsData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getreservation/${id}`);
            console.log(response.data);
            const { guestName, guestEmail, guestPhone, roomNumber, checkInDate, checkOutDate, totalPrice, status } = response.data;

            const dateIn = checkInDate?.split('T')[0];
            const dateOut = checkOutDate?.split('T')[0];

            setEditGuestName(guestName);
            setEditGuestEmail(guestEmail);
            setEditGuestPhone(guestPhone);
            setEditRoomNumber(roomNumber);
            setEditCheckInDate(dateIn);
            setEditCheckOutDate(dateOut);
            setTotalPrice(totalPrice);
            setEditBookingStatus(status);
        }
        catch (err) {
            console.log(err);
        }
    }


    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getroom");
            // console.log(response.data);
            const availableRooms = response.data.filter(
                (room) => room.roomStatus === "Available"
            );
            setRoomsData(availableRooms);
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
        if (!editRoomNumber || !editCheckInDate || !editCheckOutDate) return;

        const selectedRoom = roomsData.find((r) => r.roomNumber === editRoomNumber);
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
    }, [editRoomNumber, editCheckInDate, editCheckOutDate, roomsData]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/updatereservation/${id}`, {
                editGuestName,
                editGuestEmail,
                editGuestPhone,
                editRoomNumber,
                editCheckInDate,
                editCheckOutDate,
                totalPrice,
                editBookingStatus
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
                                    value={editGuestName}
                                    onChange={(e) => setEditGuestName(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Guest Email</label>
                                <input
                                    type="email"
                                    name="guestEmail"
                                    value={editGuestEmail}
                                    onChange={(e) => setEditGuestEmail(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Guest Phone</label>
                                <input
                                    type="tel"
                                    name="guestPhone"
                                    value={editGuestPhone}
                                    onChange={(e) => setEditGuestPhone(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    placeholder="e.g. 03001234567"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Select Booking Status</label>
                                <select
                                    name="roomNumber"
                                    value={editBookingStatus}
                                    onChange={(e) => setEditBookingStatus(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="" disabled> Select Booking Status </option>
                                    <option value="Reserved">Reserved</option>
                                    <option value="Checked-In">Checked-In</option>
                                    <option value="Checked-Out">Checked-Out</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Select Room</label>
                                <select
                                    name="roomNumber"
                                    value={editRoomNumber}
                                    onChange={(e) => setEditRoomNumber(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="" disabled> Select Available Room </option>
                                    {roomsData.map((room, idx) => (
                                        <option key={idx} value={room.roomNumber}>
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