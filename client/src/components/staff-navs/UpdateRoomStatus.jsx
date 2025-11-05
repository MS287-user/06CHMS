import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRoomStatus = () => {

    const { id } = useParams();  
    const navigate = useNavigate();

    const [room, setRoom] = useState({
        roomNumber: "",
        type: "",
        status: "",
    });

    useEffect(() => {
        setRoom({
            roomNumber: `Room ${id}`,
            type: "Deluxe",
            status: "Occupied",
        });
    }, [id]);

    const [newStatus, setNewStatus] = useState(room.status);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updating room status", id, newStatus);
        navigate(-1);
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Update Status — Room {room.roomNumber}
                        </h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Room Number</label>
                                <input
                                    type="text"
                                    value={room.roomNumber}
                                    readOnly
                                    className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Room Type</label>
                                <input
                                    type="text"
                                    value={room.type}
                                    readOnly
                                    className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Status</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Occupied">Occupied</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateRoomStatus
