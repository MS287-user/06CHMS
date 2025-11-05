import React, { useState } from 'react'

const Settings = () => {

    const [settings, setSettings] = useState({
        roomRateTax: 10, // percent
        cancellationPolicy: "Refundable within 24 hours",
        defaultCheckInTime: "14:00",
        defaultCheckOutTime: "12:00",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Settings saved:", settings);
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-1">Room Rate Tax (%)</label>
                                <input
                                    type="number"
                                    name="roomRateTax"
                                    value={settings.roomRateTax}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Cancellation Policy</label>
                                <textarea
                                    name="cancellationPolicy"
                                    value={settings.cancellationPolicy}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Default Check-In Time</label>
                                    <input
                                        type="time"
                                        name="defaultCheckInTime"
                                        value={settings.defaultCheckInTime}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Default Check-Out Time</label>
                                    <input
                                        type="time"
                                        name="defaultCheckOutTime"
                                        value={settings.defaultCheckOutTime}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded text-black"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                            >
                                Save Settings
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings
