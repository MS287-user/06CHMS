import React from 'react'

const Dashboard = () => {

    const data = {
        totalRooms: 120,
        checkedIn: 45,
        emptyRooms: 30,
        totalStaff: 15,
        reservationsToday: 10,
        occupancyRate: "65%",
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-semibold mb-6 text-black">Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Total Rooms */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Total Rooms</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{data.totalRooms}</p>
                    </div>

                    {/* Checked In Rooms */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Checked-In Rooms</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{data.checkedIn}</p>
                    </div>

                    {/* Empty Rooms */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Empty Rooms</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{data.emptyRooms}</p>
                    </div>

                    {/* Total Staff */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Total Staff</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{data.totalStaff}</p>
                    </div>

                    {/* Reservations Today */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Reservations Today</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{data.reservationsToday}</p>
                    </div>

                    {/* Occupancy Rate */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">Occupancy Rate</h2>
                        <p className="mt-2 text-3xl font-bold text-black">{data.occupancyRate}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
