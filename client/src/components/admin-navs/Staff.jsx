import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Staff = () => {
    const [staffData, setStaffData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editStaffRole, setEditStaffRole] = useState("");
    const [editStaffStatus, setEditStaffStatus] = useState("");
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const fetchStaff = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getstaff");
            console.log(response.data);
            setStaffData(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchStaff();
    }, [])

    const handleEdit = (staff) => {
        setEditId(staff._id);
        setEditName(staff.name);
        setEditEmail(staff.email);
        setEditStaffRole(staff.role);
        setEditStaffStatus(staff.status);
    }

    const handleSave = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/updatestaff/${id}`, {
                editName,
                editEmail,
                editStaffRole,
                editStaffStatus
            });

            setEditId(null);
            fetchStaff();
            toast.success(response.data.message);
        }
        catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/deletestaff/${id}`);
            console.log(response.data);
            fetchStaff();
            toast.success(response.data.message);
        }
        catch (err) {
            console.log(err);
        }
    }

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
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200 text-black">
                                    {staffData.map((staff, idx) => (
                                        <tr key={idx}>
                                            {/* Name */}
                                            <td className="px-4 py-3">
                                                {
                                                    staff._id == editId ?
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                        />
                                                        :
                                                        staff.name
                                                }
                                            </td>
                                            {/* Email */}
                                            <td className="px-4 py-3">
                                                {
                                                    staff._id == editId ?
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                            value={editEmail}
                                                            onChange={(e) => setEditEmail(e.target.value)}
                                                        />
                                                        :
                                                        staff.email
                                                }
                                            </td>
                                            {/* Roles */}
                                            <td className="px-4 py-3">
                                                {
                                                    staff._id == editId ?
                                                        <select
                                                            name="roles"
                                                            className="w-full border px-3 py-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                            value={editStaffRole || "Admin"}
                                                            onChange={(e) => setEditStaffRole(e.target.value)}
                                                        >
                                                            <option value="" disabled >Select a role</option>
                                                            <option value="Manager" >Manager</option>
                                                            <option value="Receptionist" >Receptionist</option>
                                                            <option value="Housekeeper" >Housekeeper</option>

                                                        </select>
                                                        :
                                                        staff.role
                                                }
                                            </td>
                                            {/* Status */}
                                            <td className="px-4 py-3">
                                                {
                                                    staff._id == editId ?
                                                        <select
                                                            name="status"
                                                            className="w-full border px-3 py-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                            value={editStaffStatus}
                                                            onChange={(e) => setEditStaffStatus(e.target.value)}
                                                        >
                                                            <option value="" disabled >Select Status</option>
                                                            <option value="Active" >Activate</option>
                                                            <option value="Deactive" >Deactivate</option>
                                                        </select>
                                                        :
                                                        staff.status
                                                }
                                            </td>
                                            {/* Action */}
                                            <td className="px-4 py-3 text-center space-x-2">
                                                {
                                                    staff._id == editId ?
                                                        // Save and Cancel Buttons
                                                        <>
                                                            <button
                                                                className="inline-block bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded"
                                                                onClick={() => handleSave(staff._id)}
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
                                                            {loggedUser.role == "Manager" && staff.role == "Admin" ?
                                                                "" : loggedUser.role == "Admin" && staff.role == "Admin" ?
                                                                    "" : loggedUser.role == "Manager" && staff.role == "Manager" ?
                                                                    ""
                                                                    :
                                                                    <>
                                                                        <button
                                                                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                                            onClick={() => handleEdit(staff)}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                                            onClick={() => handleDelete(staff._id)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </>}
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

export default Staff
