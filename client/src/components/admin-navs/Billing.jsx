import React from 'react'
import { Link } from 'react-router-dom';

const Billing = () => {

    const billingData = [
        {
            id: 1,
            guestName: "John Doe",
            reservationId: "RES123",
            amount: "$500",
            status: "Unpaid",
            date: "2025-11-01",
        },
        {
            id: 2,
            guestName: "Alice Smith",
            reservationId: "RES456",
            amount: "$300",
            status: "Paid",
            date: "2025-11-03",
        },
        {
            id: 3,
            guestName: "Bob Johnson",
            reservationId: "RES789",
            amount: "$700",
            status: "Unpaid",
            date: "2025-11-05",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Billing / Invoices
                        </h1>
                    </div>
                    <div className="px-6 py-4">
                        <Link
                            to="/dashboard/billing/generateinvoice"
                            className="inline-block mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            Add New Reservation
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Guest Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Reservation ID
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Date
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Amount
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {billingData.map((bill) => (
                                        <tr key={bill.id}>
                                            <td className="px-4 py-3 text-black">{bill.guestName}</td>
                                            <td className="px-4 py-3 text-black">{bill.reservationId}</td>
                                            <td className="px-4 py-3 text-black">{bill.date}</td>
                                            <td className="px-4 py-3 text-black">{bill.amount}</td>
                                            <td className="px-4 py-3 text-black">{bill.status}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                                    View
                                                </button>
                                                {bill.status === "Unpaid" && (
                                                    <button className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                                                        Mark Paid
                                                    </button>
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
        </>
    )
}

export default Billing
