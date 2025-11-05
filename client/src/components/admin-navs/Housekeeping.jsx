import React from 'react'
import { Link } from 'react-router-dom';

const Housekeeping = () => {

    const housekeepingTasks = [
        {
            id: 1,
            roomNumber: "101",
            task: "Clean sheets & towels",
            status: "Pending",
            assignedTo: "Housekeeper A",
            date: "2025-11-01",
        },
        {
            id: 2,
            roomNumber: "102",
            task: "Deep clean bathroom",
            status: "In Progress",
            assignedTo: "Housekeeper B",
            date: "2025-10-30",
        },
        {
            id: 3,
            roomNumber: "103",
            task: "Finish restocking minibar",
            status: "Completed",
            assignedTo: "Housekeeper C",
            date: "2025-10-29",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Housekeeping Tasks</h1>
                    </div>
                    <div className="px-6 py-4">
                        <Link
                            to="/dashboard/housekeeping/addnewtask"
                            className="inline-block mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            Add New Task
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room #</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {housekeepingTasks.map((task) => (
                                        <tr key={task.id}>
                                            <td className="px-4 py-3 text-black">{task.roomNumber}</td>
                                            <td className="px-4 py-3 text-black">{task.task}</td>
                                            <td className="px-4 py-3 text-black">{task.assignedTo}</td>
                                            <td className="px-4 py-3 text-black">{task.date}</td>
                                            <td className="px-4 py-3 text-black">{task.status}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                                    Edit
                                                </button>
                                                <button className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Housekeeping
