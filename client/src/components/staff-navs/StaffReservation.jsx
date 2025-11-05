import React from 'react'

const StaffReservation = () => {

    const staffReservations = [
        {
            id: 1,
            guestName: "John Doe",
            roomNumber: "202",
            checkIn: "2025-11-05",
            checkOut: "2025-11-10",
            status: "Reserved",
        },
        {
            id: 2,
            guestName: "Jane Smith",
            roomNumber: "307",
            checkIn: "2025-11-07",
            checkOut: "2025-11-12",
            status: "Checked-In",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Staff — Reservations
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Guest Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room #</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-In</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-Out</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {staffReservations.map((res) => (
                                        <tr key={res.id}>
                                            <td className="px-4 py-3 text-black">{res.guestName}</td>
                                            <td className="px-4 py-3 text-black">{res.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{res.checkIn}</td>
                                            <td className="px-4 py-3 text-black">{res.checkOut}</td>
                                            <td className="px-4 py-3 text-black">{res.status}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                    onClick={() => navigate(`/staff/reservations/${res.id}`)}
                                                >
                                                    View Details
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

export default StaffReservation
