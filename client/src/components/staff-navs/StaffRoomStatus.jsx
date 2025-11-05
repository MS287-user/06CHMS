import React from 'react'

const StaffRoomStatus = () => {

    const roomsStatus = [
        { id: 1, roomNumber: "101", type: "Deluxe", status: "Cleaning" },
        { id: 2, roomNumber: "102", type: "Standard", status: "Occupied" },
        { id: 3, roomNumber: "103", type: "Suite", status: "Available" },
        { id: 4, roomNumber: "104", type: "Deluxe", status: "Maintenance" },
        { id: 5, roomNumber: "105", type: "Standard", status: "Available" },
    ];

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
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {roomsStatus.map((room) => (
                                        <tr key={room.id}>
                                            <td className="px-4 py-3 text-black">{room.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{room.type}</td>
                                            <td className="px-4 py-3 ">
                                                <span
                                                    className={`px-2 py-1 rounded text-sm ${room.status === "Available" ? "bg-green-100 text-green-700" :
                                                        room.status === "Occupied" ? "bg-red-100 text-red-700" :
                                                            room.status === "Cleaning" ? "bg-yellow-100 text-yellow-700" :
                                                                "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {room.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => navigate(`/staff/rooms-status/update/${room.id}`)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                                    Update Status
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

export default StaffRoomStatus
