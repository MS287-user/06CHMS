import React from 'react'
import { Link } from 'react-router-dom';

const StaffCheckInOut = () => {

    const checkInOutList = [
        {
            id: 1,
            guestName: "Emma Brown",
            roomNumber: "310",
            checkIn: "2025-11-09",
            checkOut: "2025-11-15",
            status: "Reserved",
        },
        {
            id: 2,
            guestName: "David Lee",
            roomNumber: "205",
            checkIn: "2025-11-07",
            checkOut: "2025-11-12",
            status: "Checked-In",
        },
        {
            id: 3,
            guestName: "Sarah Miller",
            roomNumber: "101",
            checkIn: "2025-11-05",
            checkOut: "2025-11-10",
            status: "Checked-Out",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Staff — Check-In / Check-Out
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        <Link to="/dashboard/staff/checkinout/addcheckinout"
                            className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded">
                            New Check-In / Out
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Guest Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Room #
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Check-In
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Check-Out
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {checkInOutList.map((entry) => (
                                        <tr key={entry.id}>
                                            <td className="px-4 py-3 text-black">{entry.guestName}</td>
                                            <td className="px-4 py-3 text-black">{entry.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{entry.checkIn}</td>
                                            <td className="px-4 py-3 text-black">{entry.checkOut}</td>
                                            <td className="px-4 py-3 text-black">{entry.status}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                                                    Check In
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                                    Check Out
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

export default StaffCheckInOut
