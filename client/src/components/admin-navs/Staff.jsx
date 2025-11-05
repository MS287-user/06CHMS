import React from 'react'
import { Link } from 'react-router-dom';

const Staff = () => {

    const staffData = [
        { id: 1, name: "Alice Smith", email: "alice@example.com", role: "Manager" },
        { id: 2, name: "Bob Johnson", email: "bob@example.com", role: "Receptionist" },
        { id: 3, name: "Carol Davis", email: "carol@example.com", role: "Housekeeping" },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Staff Management
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        <Link
                            to="/dashboard/staff/addstaff"
                            className="inline-block mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            Add New Staff
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Email
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Role
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-black">
                                    {staffData.map((staff) => (
                                        <tr key={staff.id}>
                                            <td className="px-4 py-3">{staff.name}</td>
                                            <td className="px-4 py-3">{staff.email}</td>
                                            <td className="px-4 py-3">{staff.role}</td>
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

export default Staff
