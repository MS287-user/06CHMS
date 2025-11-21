import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddMaintainanceRequest = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [guestData, setGuestData] = useState([]);
    const [guestId, setGuestId] = useState("");
    const [roomId, setRoomId] = useState("");
    const [issue, setIssue] = useState("");
    const [resolveStatus, setResolveStatus] = useState("");
    const [reportedDate, setReportedDate] = useState("");
    const today = new Date().toISOString().split("T")[0];

    const fetchRooms = async (guestId) => {
        try {
            const response = await axios.get(`http://localhost:3000/getreservationbyguest/${guestId}`);
            // console.log(response.data);
            const rooms = [];
            response.data.map((res, idx) => {
                rooms.push(res.roomId);
            })
            console.log(rooms);
            setRoomsData(rooms);
        }
        catch (err) {
            console.log(err);
        }
    }
    const fetchGuest = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getguest");
            console.log(response.data);
            setGuestData(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchGuest();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/addmaintenance", {
                guestId,
                roomId,
                issue,
                resolveStatus,
                reportedDate
            });

            console.log(response.data);
            setGuestId("");
            setRoomId("");
            setIssue("");
            setResolveStatus("");
            setReportedDate("");
            fetchGuest();
            toast.success(response.data.message);
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }
    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Add New Maintenance Request
                        </h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Guest Info */}
                            <div>
                                <label className="block text-gray-700 mb-1">Reported By</label>
                                <select
                                    name="guest"
                                    value={guestId}
                                    onChange={(e) => { setGuestId(e.target.value); fetchRooms(e.target.value) }}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="" disabled>Select Name</option>
                                    {guestData.map((guest, idx) => (
                                        <option key={idx} value={guest._id}>
                                            {guest.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            {/* Room Info */}
                            <div>
                                <label className="block text-gray-700 mb-1">Room Number</label>
                                <select
                                    name="roomNumber"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="" disabled> Select Available Room </option>
                                    {roomsData.map((room, idx) => (
                                        <option key={idx} value={room._id}>
                                            {room.roomNumber} — {room.roomType}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div>
                                <label className="block text-gray-700 mb-1">Issue Description</label>
                                <textarea
                                    name="issueDescription"
                                    value={issue}
                                    onChange={(e) => setIssue(e.target.value)}
                                    rows={3}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={reportedDate}
                                    onChange={(e) => setReportedDate(e.target.value)}
                                    min={today}
                                    className="w-full border px-3 py-2 rounde text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={resolveStatus}
                                    onChange={(e) => setResolveStatus(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="" disabled>Select Issue Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>

                            </div>
                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                            >
                                Submit Request
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

export default AddMaintainanceRequest
