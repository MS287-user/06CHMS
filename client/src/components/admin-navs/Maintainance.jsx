import React from 'react'
import { Link } from 'react-router-dom';

const Maintainance = () => {

    const maintenanceRequests = [
        {
            id: 1,
            roomNumber: "201",
            issue: "Air conditioner not working",
            status: "Pending",
            reportedBy: "Guest A",
            date: "2025-11-02",
        },
        {
            id: 2,
            roomNumber: "305",
            issue: "Leaking faucet",
            status: "In Progress",
            reportedBy: "Guest B",
            date: "2025-11-01",
        },
        {
            id: 3,
            roomNumber: "110",
            issue: "Broken window latch",
            status: "Resolved",
            reportedBy: "Guest C",
            date: "2025-10-29",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Maintenance Requests</h1>
                    </div>
                    <div className="px-6 py-4">
                        <Link
                            to="/dashboard/maintenance/addnewrequest"
                            className="inline-block mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            Add New Request
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room #</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reported By</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {maintenanceRequests.map((req) => (
                                        <tr key={req.id}>
                                            <td className="px-4 py-3 text-black">{req.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{req.issue}</td>
                                            <td className="px-4 py-3 text-black">{req.reportedBy}</td>
                                            <td className="px-4 py-3 text-black">{req.status}</td>
                                            <td className="px-4 py-3 text-black">{req.date}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                                    Resolve
                                                </button>
                                                <button className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
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

export default Maintainance
