import React from 'react'

const MyBookings = () => {

    const bookings = [
        {
            id: 1,
            roomNumber: "305",
            roomType: "Deluxe Suite",
            checkIn: "2025-12-10",
            checkOut: "2025-12-15",
            status: "Confirmed",
            totalAmount: "$750",
        },
        {
            id: 2,
            roomNumber: "202",
            roomType: "Standard",
            checkIn: "2025-12-20",
            checkOut: "2025-12-22",
            status: "Checked-In",
            totalAmount: "$210",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">My Bookings</h1>
                    </div>
                    <div className="px-6 py-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Room #</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Check-In</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Check-Out</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((b) => (
                                        <tr key={b.id}>
                                            <td className="px-4 py-3 text-black">{b.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{b.roomType}</td>
                                            <td className="px-4 py-3 text-black">{b.checkIn}</td>
                                            <td className="px-4 py-3 text-black">{b.checkOut}</td>
                                            <td className="px-4 py-3 text-black">{b.status}</td>
                                            <td className="px-4 py-3 text-black">{b.totalAmount}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => navigate(`/guest/bookings/${b.id}`)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
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

export default MyBookings
