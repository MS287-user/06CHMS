import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Guests = () => {
    const [guestData, setGuestData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editStaffRole, setEditStaffRole] = useState("");
    const [editStaffStatus, setEditStaffStatus] = useState("");
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const fetchGuest = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getguest");
            console.log(response.data);
            setGuestData(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchGuest();
    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/deleteguest/${id}`);
            console.log(response.data);
            fetchGuest();
            toast.success(response.data.message);
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Guest Management
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        <Link
                            to="/dashboard/guests/addguest"
                            className="inline-block mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            Add New Guest
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
                                            Phone
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Address
                                        </th>

                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200 text-black">
                                    {guestData.map((guest, idx) => (
                                        <tr key={idx}>
                                            {/* Name */}
                                            <td className="px-4 py-3">
                                                {guest.name}
                                            </td>
                                            {/* Email */}
                                            <td className="px-4 py-3">
                                                {guest.email}
                                            </td>
                                            {/* Phone */}
                                            <td className="px-4 py-3">
                                                {guest.phone}
                                            </td>
                                            {/* Address */}
                                            <td className="px-4 py-3">
                                                {guest.address}
                                            </td>
                                            {/* Action */}
                                            <td className="px-4 py-3 text-center space-x-2">
                                                {<>
                                                    <button
                                                        className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                        onClick={() => handleDelete(guest._id)}
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

export default Guests