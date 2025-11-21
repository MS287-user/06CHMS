import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Billing = () => {
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [editGuestName, setEditGuestName] = useState("");
  const [editRoomNumber, setEditRoomNumber] = useState("");
  const [editCheckInDate, setEditCheckInDate] = useState("");
  const [editCheckOutDate, setEditCheckOutDate] = useState("");
  const [editTotalDays, setEditTotalDays] = useState("");
  const [editRoomPrice, setEditRoomPrice] = useState("");
  const [editAdditionalCharges, setEditAdditionalCharges] = useState("");
  const [editTotalAmount, setEditTotalAmount] = useState("");
  const [editPaymentStatus, setEditPaymentStatus] = useState("");

  const fetchBilling = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getbilling");
      setBillingData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBilling();
  }, []);

  const handleEdit = (bill) => {
    setEditId(bill._id);
    setEditGuestName(bill.guestName);
    setEditRoomNumber(bill.roomNumber);
    setEditCheckInDate(bill.checkInDate.split("T")[0]);
    setEditCheckOutDate(bill.checkOutDate.split("T")[0]);
    setEditTotalDays(bill.totalDays);
    setEditRoomPrice(bill.roomPrice);
    setEditAdditionalCharges(bill.additionalCharges);
    setEditTotalAmount(bill.totalAmount);
    setEditPaymentStatus(bill.paymentStatus);
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/updatebilling/${id}`, {
        editGuestName,
        editRoomNumber,
        editCheckInDate,
        editCheckOutDate,
        editTotalDays,
        editRoomPrice,
        editAdditionalCharges,
        editTotalAmount,
        editPaymentStatus,
      });

      toast.success(response.data.message);
      setEditId(null);
      fetchBilling();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update billing record");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deletebilling/${id}`);
      setBillingData(billingData.filter((bill) => bill._id !== id));
      toast.success(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-semibold text-gray-800">Billing / Invoices</h1>
          </div>
          <div className="px-6 py-4">
            <Link
              to="/dashboard/billing/generateinvoice"
              className="inline-block mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
            >
              Add New Billing
            </Link>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-black">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-In</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-Out</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Add. Charges</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {billingData.map((bill) => (
                    <tr key={bill._id}>
                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <input
                            type="text"
                            value={editGuestName}
                            onChange={(e) => setEditGuestName(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        ) : (
                          bill.guestName
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <input
                            type="text"
                            value={editRoomNumber}
                            onChange={(e) => setEditRoomNumber(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        ) : (
                          bill.roomNumber
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <input
                            type="date"
                            value={editCheckInDate}
                            onChange={(e) => setEditCheckInDate(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        ) : (
                          new Date(bill.checkInDate).toLocaleDateString()
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <input
                            type="date"
                            value={editCheckOutDate}
                            onChange={(e) => setEditCheckOutDate(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        ) : (
                          new Date(bill.checkOutDate).toLocaleDateString()
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <input
                            type="number"
                            value={editTotalDays}
                            onChange={(e) => {
                              const newDays = e.target.value;
                              setEditTotalDays(newDays);
                              setEditTotalAmount(
                                (parseFloat(editRoomPrice) || 0) * (parseFloat(newDays) || 0) +
                                (parseFloat(editAdditionalCharges) || 0)
                              );
                            }}
                            className="w-full border px-2 py-1 rounded"
                          />
                        ) : (
                          bill.totalDays
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <input
                            type="number"
                            value={editRoomPrice}
                            onChange={(e) => setEditRoomPrice(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        ) : (
                          `$${bill.roomPrice}`
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <input
                            type="number"
                            value={editAdditionalCharges}
                            onChange={(e) => {
                              const newCharges = e.target.value;
                              setEditAdditionalCharges(newCharges);
                              setEditTotalAmount(
                                (parseFloat(editRoomPrice) || 0) * (parseFloat(editTotalDays) || 0) +
                                (parseFloat(newCharges) || 0)
                              );
                            }}
                            className="w-full border px-2 py-1 rounded"
                          />
                        ) : (
                          `$${bill.additionalCharges}`
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <input
                            type="number"
                            value={editTotalAmount}
                            onChange={(e) => setEditTotalAmount(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        ) : (
                          `$${bill.totalAmount}`
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill._id === editId ? (
                          <select
                            value={editPaymentStatus}
                            onChange={(e) => setEditPaymentStatus(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                          </select>
                        ) : (
                          bill.paymentStatus
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-center items-center space-x-3">
                          {bill._id === editId ? (
                            <>
                              <button
                                onClick={() => handleSave(bill._id)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                              >
                                Save
                              </button>

                              <button
                                onClick={() => setEditId(null)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(bill)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(bill._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                              >
                                Delete
                              </button>

                              <button
                                onClick={() => window.print()}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                              >
                                Print
                              </button>
                            </>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                  {billingData.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-3 text-center text-gray-500">
                        No billing records found.
                      </td>
                    </tr>
                  )}
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

export default Billing;
