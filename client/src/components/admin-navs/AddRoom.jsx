import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const AddRoom = () => {
    const [roomNumber, setRoomNumber] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [roomStatus, setRoomStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/addroom", {
                roomNumber,
                roomType,
                roomPrice,
                roomStatus
            });
            setRoomNumber("");
            setRoomPrice("");
            console.log(response.data);
            toast.success(response.data.message);
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Add New Room</h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Room Number</label>
                                <input
                                    type="text"
                                    name="roomNumber"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Type</label>
                                <select
                                    name="status"
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="" disabled>Select Room Type</option>
                                    <option value="Deluxe Suite">Deluxe Suite</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={roomPrice}
                                    onChange={(e) => setRoomPrice(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={roomStatus}
                                    onChange={(e) => setRoomStatus(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="" disabled>Select Room Status</option>
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
                                Add Room
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

export default AddRoom
