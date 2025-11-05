import React from 'react'
import { Link } from 'react-router-dom';

const GuestProfile = () => {

    const user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "0300-9876543",
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
                    </div>
                    <div className="px-6 py-6 space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={user.name}
                                disabled
                                className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="text"
                                value={user.phone}
                                disabled
                                className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                            />
                        </div>

                        <Link
                            to="/guest/profile/editprofile"
                            className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            Update Profile
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GuestProfile
