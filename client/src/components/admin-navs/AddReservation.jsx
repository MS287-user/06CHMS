import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddReservation = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [guestName, setGuestName] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [guestPhone, setGuestPhone] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getroom");
            console.log(response.data);
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
        fetchRooms();
    }, [])

    useEffect(() => {
        if (!roomNumber || !checkInDate || !checkOutDate) return;

        const selectedRoom = roomsData.find((r) => r.roomNumber === roomNumber);
        if (!selectedRoom) return;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const diffTime = checkOut - checkIn;

        const nights = diffTime / (1000 * 60 * 60 * 24);

        if (nights > 0) {
            const total = nights * Number(selectedRoom.roomPrice);
            setTotalPrice(total.toFixed(2));
        } else {
            setTotalPrice("");
        }
    }, [roomNumber, checkInDate, checkOutDate, roomsData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/addreservation",{
                guestName,
                guestEmail,
                guestPhone,
                roomNumber,
                checkInDate,
                checkOutDate,
                totalPrice
            });

            console.log(response.data);
            setGuestName("");
            setGuestEmail("");
            setGuestPhone("");
            setRoomNumber("");
            setCheckInDate("");
            setCheckOutDate("");
            setTotalPrice("");
            fetchRooms();
            toast.success(response.data.message);
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Add New Reservation
                        </h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Guest Name</label>
                                <input
                                    type="text"
                                    name="guestName"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Guest Email</label>
                                <input
                                    type="email"
                                    name="guestEmail"
                                    value={guestEmail}
                                    onChange={(e) => setGuestEmail(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Guest Phone</label>
                                <input
                                    type="tel"
                                    name="guestPhone"
                                    value={guestPhone}
                                    onChange={(e) => setGuestPhone(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    placeholder="e.g. 03001234567"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Select Room</label>
                                <select
                                    name="roomNumber"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
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
                                        value={checkInDate}
                                        onChange={(e) => setCheckInDate(e.target.value)}
                                        className="w-full border px-3 py-2 rounded text-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">Check-Out Date</label>
                                    <input
                                        type="date"
                                        name="checkOutDate"
                                        value={checkOutDate}
                                        onChange={(e) => setCheckOutDate(e.target.value)}
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
                                Create Reservation
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

export default AddReservation
