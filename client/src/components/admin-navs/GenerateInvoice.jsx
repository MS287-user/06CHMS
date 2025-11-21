import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const GenerateInvoice = () => {
  const [form, setForm] = useState({
    guestName: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    totalDays: "",
    roomPrice: "",
    additionalCharges: 0,
    totalAmount: "",
    paymentStatus: "pending",
  });

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getcheckoutroomsfrombooking");
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoomChange = async (e) => {
  const selectedRoom = e.target.value;
  setForm(prev => ({ ...prev, roomNumber: selectedRoom }));

  if (!selectedRoom) {
    setForm(prev => ({
      ...prev,
      guestName: "",
      checkInDate: "",
      checkOutDate: "",
      roomPrice: "",
      totalDays: "",
    }));
    return;
  }

  try {
    const reservationRes = await axios.get(`http://localhost:3000/getreservationbyroom/${selectedRoom}`);

    if (reservationRes.status === 200) {
      const { guestName, checkInDate, checkOutDate, roomPrice } = reservationRes.data;

      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      setForm(prev => ({
        ...prev,
        guestName,
        checkInDate: checkInDate.split("T")[0],
        checkOutDate: checkOutDate.split("T")[0],
        roomPrice,
        totalDays,
        totalAmount: (totalDays * roomPrice) + parseFloat(prev.additionalCharges || 0)
      }));
    }

  } catch (err) {
    console.error("Error fetching reservation:", err);
    setForm(prev => ({
      ...prev,
      guestName: "",
      checkInDate: "",
      checkOutDate: "",
      roomPrice: "",
      totalDays: "",
      totalAmount: "",
    }));
  }
};


  const calculateTotal = () => {
    const total =
      (parseFloat(form.totalDays || 0) * parseFloat(form.roomPrice || 0)) +
      parseFloat(form.additionalCharges || 0);
    setForm({ ...form, totalAmount: total });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/addbilling", form);
      if (res.status === 200) {
        toast.success(res.data.message);
        setForm({
          guestName: "",
          roomNumber: "",
          checkInDate: "",
          checkOutDate: "",
          totalDays: "",
          roomPrice: "",
          additionalCharges: 0,
          totalAmount: "",
          paymentStatus: "pending",
        });
      }
    } catch (error) {
      console.error("Error adding billing record:", error);
      alert("Failed to add billing record. Check console for details.");
    }
  };

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-semibold text-gray-800">Add Billing Record</h1>
          </div>
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-1">Room Number</label>
                <select
                  name="roomNumber"
                  value={form.roomNumber}
                  onChange={handleRoomChange}
                  className="w-full border px-3 py-2 rounded text-black"
                  required
                >
                  <option value="">Select Room</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room.roomNumber}>
                      {room.roomNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Guest Name</label>
                <input
                  type="text"
                  name="guestName"
                  value={form.guestName}
                  readOnly
                  className="w-full border px-3 py-2 rounded text-black bg-gray-100"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Total Days</label>
                  <input
                    type="number"
                    name="totalDays"
                    value={form.totalDays}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Room Price (per day)</label>
                  <input
                    type="number"
                    name="roomPrice"
                    value={form.roomPrice}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Additional Charges</label>
                <input
                  type="number"
                  name="additionalCharges"
                  value={form.additionalCharges}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Total Amount</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={form.totalAmount}
                  readOnly
                  className="w-full border px-3 py-2 rounded text-black bg-gray-100"
                  onFocus={calculateTotal}
                  required
                />
                <small className="text-gray-500">Click or focus to auto-calculate</small>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Payment Status</label>
                <select
                  name="paymentStatus"
                  value={form.paymentStatus}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-black"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                >
                  Save Billing Record
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default GenerateInvoice;
