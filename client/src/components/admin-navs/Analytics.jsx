import React from 'react'

const Analytics = () => {

    const stats = {
        totalRevenue: "$12,500",
        avgStay: "2.8 nights",
        occupancyRate: "68%",
        totalGuests: 342,
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Total Revenue</h2>
                        <p className="mt-2 text-2xl font-bold text-black">{stats.totalRevenue}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Avg Stay Duration</h2>
                        <p className="mt-2 text-2xl font-bold text-black">{stats.avgStay}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Occupancy Rate</h2>
                        <p className="mt-2 text-2xl font-bold text-black">{stats.occupancyRate}</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Total Guests</h2>
                        <p className="mt-2 text-2xl font-bold text-black">{stats.totalGuests}</p>
                    </div>
                </div>

                {/* Placeholder for chart area */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking Trend (Last 7 Days)</h2>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        <span>Chart Placeholder</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics
