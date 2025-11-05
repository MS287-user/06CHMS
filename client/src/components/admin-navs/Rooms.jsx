import React from 'react'
import { Link } from 'react-router-dom';

const Rooms = () => {

    const roomsData = [
        { id: 1, number: "101", type: "Deluxe Suite", price: "$150", status: "Available" },
        { id: 2, number: "102", type: "Standard", price: "$100", status: "Occupied" },
        { id: 3, number: "103", type: "Suite", price: "$200", status: "Cleaning" },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Rooms Management
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        <Link
                            to="/dashboard/rooms/addroom"
                            className="inline-block mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            Add New Room
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Room Number
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Type
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Price
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-black">
                                    {roomsData.map((room) => (
                                        <tr key={room.id}>
                                            <td className="px-4 py-3">{room.number}</td>
                                            <td className="px-4 py-3">{room.type}</td>
                                            <td className="px-4 py-3">{room.price}</td>
                                            <td className="px-4 py-3">{room.status}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                <button
                                                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
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
        </>
    )
}

export default Rooms
