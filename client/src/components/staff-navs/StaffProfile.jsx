import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const StaffProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editStaffRole, setEditStaffRole] = useState("");

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const fetchStaff = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getstaff");

            const currentStaff = response.data.find(
                (staff) => staff._id == loggedUser._id
            );

            const { _id, name, email, address, role } = currentStaff;
            setEditId(_id);
            setEditName(name);
            setEditEmail(email);
            setEditAddress(address);
            setEditStaffRole(role);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchStaff();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/updatestaff/${editId}`, {
                editName,
                editEmail,
                editAddress,
                editStaffRole,
            });
            setEditMode(false);
            toast.success(response.data.message);
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }


    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="px-6 py-6 space-y-4">
                            {editMode ?
                                <div>
                                    <label className="block text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                    />
                                </div>
                                :
                                <div>
                                    <label className="block text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        disabled
                                        className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                    />
                                </div>
                            }

                            {editMode ?
                                <div>
                                    <label className="block text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                        className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                    />
                                </div>
                                :
                                <div>
                                    <label className="block text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editEmail}
                                        disabled
                                        className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                    />
                                </div>
                            }

                            {editMode ?
                                <div>
                                    <label className="block text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={editAddress}
                                        onChange={(e) => setEditAddress(e.target.value)}
                                        className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                    />
                                </div>
                                :
                                <div>
                                    <label className="block text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={editAddress}
                                        disabled
                                        className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                    />
                                </div>
                            }

                            <div>
                                <label className="block text-gray-700 mb-1">Role / Job</label>
                                <input
                                    type="text"
                                    value={editStaffRole}
                                    disabled
                                    className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                                />
                            </div>

                            {editMode ?
                                <span
                                    className="cursor-pointer inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                                >
                                    <button className="cursor-pointer" type='submit'>
                                        Update Profile
                                    </button>

                                </span>
                                :
                                <button
                                    type='button'
                                    onClick={() => setEditMode(true)}
                                    className="cursor-pointer inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                                >
                                    Edit Profile
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default StaffProfile
