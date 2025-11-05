import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom';

const AddStaff = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [staffRole, setStaffRole] = useState("");

    const handleStaffRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/register", {
                name,
                email,
                address,
                password,
                staffRole
            });
            setName("");
            setEmail("");
            setAddress("");
            setPassword("");
            
            console.log(response.data);
            toast.success(response.data.message);
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
                <div className="max-w-4xl w-[90%] mx-auto bg-white rounded-lg shadow overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800 text-center">
                            Add Staff
                        </h1>
                    </div>

                    {/* Form Body */}
                    <div className="px-6 py-6">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleStaffRegistration}>
                            {/* LEFT SIDE */}
                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                {/* Roles Dropdown */}
                                <div>
                                    <label className="block text-gray-700 mb-1">Roles</label>
                                    <select
                                        name="roles"
                                        className="w-full border px-3 py-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        value={staffRole}
                                        onChange={(e) => setStaffRole(e.target.value)}
                                    >
                                        <option value="" disabled >Select a role</option>
                                        <option value="Manager" >Manager</option>
                                        <option value="Receptionist" >Receptionist</option>
                                        <option value="Housekeeper" >Housekeeper</option>
                                        
                                    </select>
                                    
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="space-y-4">

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="mt-8 text-center">
                                    <button
                                        type="submit"
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                        </form>

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

export default AddStaff
