import React, { useState } from 'react'

const GuestServiceRequest = () => {

    const [serviceType, setServiceType] = useState("Room Service");
    const [details, setDetails] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Service Request:", { serviceType, details });
        setDetails("");
    };

    const pastRequests = [
        {
            id: 1,
            serviceType: "Room Service",
            details: "Extra towels",
            status: "Completed",
            date: "2025-10-18",
        },
        {
            id: 2,
            serviceType: "Taxi Pickup",
            details: "Airport pickup at 9 AM",
            status: "Pending",
            date: "2025-10-20",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Service Request</h1>
                    </div>
                    <div className="px-6 py-6 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Service Type</label>
                                <select
                                    value={serviceType}
                                    onChange={(e) => setServiceType(e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    <option value="Room Service">Room Service</option>
                                    <option value="Wake-Up Call">Wake-Up Call</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Laundry">Laundry</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Details</label>
                                <textarea
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    rows={3}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    placeholder="Provide your request details..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                            >
                                Submit Request
                            </button>
                        </form>

                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-gray-700">Your Requests</h2>
                            <div className="space-y-4 mt-4">
                                {pastRequests.map((req) => (
                                    <div
                                        key={req.id}
                                        className="border border-gray-200 rounded p-4 bg-gray-50 text-black"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold">{req.serviceType}</span>
                                            <span className="text-sm text-gray-500">{req.date}</span>
                                        </div>
                                        <p className="text-gray-700">Details: {req.details}</p>
                                        <p>Status: {req.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GuestServiceRequest
