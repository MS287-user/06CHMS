import React, { useState } from 'react'

const AddCheckInOut = () => {

    const [form, setForm] = useState({
        guestName: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        status: "Reserved",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Check-In/Out data:", form);
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            New Check-In / Out
                        </h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Guest Name</label>
                                <input
                                    type="text"
                                    name="guestName"
                                    value={form.guestName}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Room ID / Number</label>
                                <input
                                    type="text"
                                    name="roomId"
                                    value={form.roomId}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Check-In Date</label>
                                    <input
                                        type="date"
                                        name="checkInDate"
                                        value={form.checkInDate}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded text-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Check-Out Date</label>
                                    <input
                                        type="date"
                                        name="checkOutDate"
                                        value={form.checkOutDate}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded text-black"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="Reserved">Reserved</option>
                                    <option value="Checked-In">Checked-In</option>
                                    <option value="Checked-Out">Checked-Out</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCheckInOut
