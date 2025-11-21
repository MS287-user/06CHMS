import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Housekeeping = () => {
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editStatus, setEditStatus] = useState("");

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:3000/getcleaning");
            setTasks(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch cleaning tasks");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/deletecleaning/${id}`);
            toast.success("Task deleted successfully");
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete task");
        }
    };

    const handleEdit = (task) => {
        setEditId(task._id);
        setEditStatus(task.cleaningStatus);
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:3000/updatecleaning/${id}`, { cleaningStatus: editStatus });
            toast.success("Status updated successfully");
            setTasks(tasks.map(task => task._id === id ? { ...task, cleaningStatus: editStatus } : task));
            setEditId(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update status");
        }
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Cleaning Tasks</h1>
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
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tasks.map(task => (
                                        <tr key={task._id}>
                                            <td className="px-4 py-3 text-black">{task.roomId?.roomNumber || "N/A"}</td>
                                            <td className="px-4 py-3 text-black">
                                                {editId === task._id ? (
                                                    <select
                                                        value={editStatus}
                                                        onChange={(e) => setEditStatus(e.target.value)}
                                                        className="border px-2 py-1 rounded"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                ) : (
                                                    task.cleaningStatus
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-black">{new Date(task.reportedDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                {editId === task._id ? (
                                                    <>
                                                        <button
                                                            className="inline-block bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded"
                                                            onClick={() => handleSave(task._id)}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                                                            onClick={() => setEditId(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                            onClick={() => handleEdit(task)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                            onClick={() => handleDelete(task._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default Housekeeping;
