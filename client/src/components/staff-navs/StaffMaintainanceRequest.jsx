import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const StaffMaintainanceRequest = () => {
    const [maintenanceData, setMaintenanceData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editResolveStatus, setEditResolveStatus] = useState("");
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const fetchMaintenanceData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getmaintenance");
            console.log(response.data);
            setMaintenanceData(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMaintenanceData();
    }, []);

    const handleEdit = (mtn) => {
        setEditId(mtn._id);
        setEditResolveStatus(mtn.status);
    }

    const handleSave = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/updatemaintenance/${id}`, {
                editResolveStatus
            });
            setEditId(null);
            fetchMaintenanceData();
            toast.success(response.data.message);
        }
        catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/deletemaintenance/${id}`);
            console.log(response.data);
            fetchMaintenanceData();
            toast.success(response.data.message);
        }
        catch (err) {
            toast.success(err.response.data.message);
        }
    }

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Maintenance Requests</h1>
                    </div>
                    <div className="px-6 py-4">

                        <Link
                            to="/dashboard/staff/maintenance/newmaintainancerequest"
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
                                    {maintenanceData.map((mtn) => (
                                        <tr key={mtn._id}>
                                            <td className="px-4 py-3 text-black">
                                                {mtn.roomId.roomNumber}
                                            </td>
                                            <td className="px-4 py-3 text-black">{mtn.issue}</td>
                                            <td className="px-4 py-3 text-black">{mtn.guestId.name}</td>
                                            <td className="px-4 py-3 text-black">
                                                {
                                                    mtn._id == editId ?
                                                        <select
                                                            name="status"
                                                            value={editResolveStatus}
                                                            onChange={(e) => setEditResolveStatus(e.target.value)}
                                                            className="w-full border px-3 py-2 rounded text-black"
                                                        >
                                                            <option value="" disabled>Select Issue Status</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Resolved">Resolved</option>
                                                        </select>
                                                        :
                                                        mtn.resolveStatus
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-black">{new Date(mtn.reportedDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                {
                                                    mtn._id == editId ?
                                                        // Save and Cancel Buttons
                                                        <>
                                                            <button
                                                                className="inline-block bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded"
                                                                onClick={() => handleSave(mtn._id)}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                                                                onClick={() => setEditId(null)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                        :
                                                        // Edit and Delete Buttons
                                                        <>
                                                            {loggedUser.role == "Receptionist" ?
                                                                ""
                                                                :
                                                                <button
                                                                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                                    onClick={() => handleEdit(mtn)}
                                                                >
                                                                    Edit
                                                                </button>
                                                            }

                                                            <button
                                                                className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                                onClick={() => handleDelete(mtn._id)}
                                                            >
                                                                Delete
                                                            </button>

                                                        </>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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

export default StaffMaintainanceRequest
