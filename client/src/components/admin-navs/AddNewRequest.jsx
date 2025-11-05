import React, { useState } from 'react'

const AddNewRequest = () => {

    const [form, setForm] = useState({
        roomNumber: "",
        issueDescription: "",
        reportedBy: "",
        date: "",
        status: "Pending",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting new maintenance request:", form);
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Add New Maintenance Request
                        </h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Room Number</label>
                                <input
                                    type="text"
                                    name="roomNumber"
                                    value={form.roomNumber}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Issue Description</label>
                                <textarea
                                    name="issueDescription"
                                    value={form.issueDescription}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Reported By</label>
                                <input
                                    type="text"
                                    name="reportedBy"
                                    value={form.reportedBy}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounde text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewRequest
