import React from 'react'
import { Link } from 'react-router-dom';

const StaffMaintainanceRequest = () => {

    const maintenanceRequestsStaff = [
        {
            id: 1,
            roomNumber: "205",
            issue: "AC not working",
            status: "Pending",
            reportedBy: "Guest X",
            date: "2025-11-02",
        },
        {
            id: 2,
            roomNumber: "310",
            issue: "Leaking faucet",
            status: "In Progress",
            reportedBy: "Guest Y",
            date: "2025-11-04",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Staff — Maintenance Requests
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        <Link
                            to="/dashboard/staff/maintenance/newmaintainancerequest"
                            className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded">
                            Add New Request
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room #</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {maintenanceRequestsStaff.map((req) => (
                                        <tr key={req.id}>
                                            <td className="px-4 py-3 text-black">{req.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{req.issue}</td>
                                            <td className="px-4 py-3 text-black">{req.status}</td>
                                            <td className="px-4 py-3 text-black">{req.date}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                                    View / Edit
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

export default StaffMaintainanceRequest
