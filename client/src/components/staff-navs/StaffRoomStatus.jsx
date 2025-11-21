import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const StaffRoomStatus = () => {

    const [roomsData, setRoomsData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editRoomNumber, setEditRoomNumber] = useState("");
    const [editRoomType, setEditRoomType] = useState("");
    const [editRoomPrice, setEditRoomPrice] = useState("");
    const [editRoomStatus, setEditRoomStatus] = useState("");
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getroom");
            console.log(response.data);
            setRoomsData(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleEdit = (room) => {
        setEditId(room._id);
        setEditRoomNumber(room.roomNumber);
        setEditRoomType(room.roomType);
        setEditRoomPrice(room.roomPrice);
        setEditRoomStatus(room.roomStatus);
    }

    const handleSave = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/updateroom/${id}`, {
                editRoomNumber,
                editRoomType,
                editRoomPrice,
                editRoomStatus
            });

            console.log(response.data);
            setEditId(null);
            fetchRooms();
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
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Room Status (Staff View)
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room #</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        {loggedUser.role == "Housekeeper" ?
                                            ""
                                            :
                                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {roomsData.map((room) => (
                                        <tr key={room._id}>
                                            <td className="px-4 py-3 text-black">
                                                {
                                                    room._id == editId ?
                                                        <input
                                                            type="text"
                                                            name="roomNumber"
                                                            value={editRoomNumber}
                                                            onChange={(e) => setEditRoomNumber(e.target.value)}
                                                            className="w-full border px-3 py-2 rounded text-black"
                                                        />
                                                        :
                                                        room.roomNumber
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-black">
                                                {
                                                    room._id == editId ?
                                                        <select
                                                            name="status"
                                                            value={editRoomType}
                                                            onChange={(e) => setEditRoomType(e.target.value)}
                                                            className="w-full border px-3 py-2 rounded text-black"
                                                        >
                                                            <option value="" disabled>Select Room Type</option>
                                                            <option value="Deluxe Suite">Deluxe Suite</option>
                                                            <option value="Standard">Standard</option>
                                                            <option value="Suite">Suite</option>
                                                        </select>
                                                        :
                                                        room.roomType
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-black">
                                                {
                                                    room._id == editId ?
                                                        <input
                                                            type="text"
                                                            name="roomPrice"
                                                            value={editRoomPrice}
                                                            onChange={(e) => setEditRoomPrice(e.target.value)}
                                                            className="w-full border px-3 py-2 rounded text-black"
                                                        />
                                                        :
                                                        `$${room.roomPrice}`
                                                }
                                            </td>
                                            <td className="px-4 py-3 ">
                                                {room._id == editId ?
                                                    <select
                                                        name="status"
                                                        value={editRoomStatus}
                                                        onChange={(e) => setEditRoomStatus(e.target.value)}
                                                        className="w-full border px-3 py-2 rounded text-black"
                                                    >
                                                        <option value="" disabled>Select Room Status</option>
                                                        <option value="Available">Available</option>
                                                        <option value="Reserved">Reserved</option>
                                                        <option value="Occupied">Occupied</option>
                                                        <option value="Cleaning">Cleaning</option>
                                                        <option value="Maintenance">Maintenance</option>
                                                    </select>
                                                    :
                                                    <span
                                                        className={`px-2 py-1 rounded text-sm ${room.roomStatus == "Available" ? "bg-green-100 text-green-700" :
                                                            room.roomStatus == "Occupied" ? "bg-red-100 text-red-700" :
                                                                room.roomStatus == "Cleaning" ? "bg-blue-100 text-blue-700" :
                                                                    room.roomStatus == "Maintenance" ?
                                                                        "bg-yellow-100 text-yellow-700" :
                                                                        room.roomStatus == "Reserved" ?
                                                                            "bg-yellow-100 text-yellow-700" :
                                                                            "bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        {room.roomStatus}
                                                    </span>
                                                }

                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {room._id == editId ?
                                                    <>
                                                        <button
                                                            className="inline-block bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded"
                                                            onClick={() => handleSave(room._id)}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                                                            onClick={() => setEditId(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                    :
                                                    <>
                                                        {loggedUser.role == "Housekeeper" ?
                                                            ""
                                                            :
                                                            <button
                                                                onClick={() => handleEdit(room)}
                                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                                                Update Status
                                                            </button>
                                                        }
                                                    </>

                                                }
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

export default StaffRoomStatus
