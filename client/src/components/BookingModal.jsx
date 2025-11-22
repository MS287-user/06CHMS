import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BookingModal = ({ open, setOpen }) => {
  const [roomsData, setRoomsData] = useState([]);
  const [guestId, setGuestId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toISOString().split("T")[0];

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getroom");
      setRoomsData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!roomId || !checkInDate || !checkOutDate || roomsData.length === 0) return;

    const selectedRoom = roomsData.find((r) => r._id === roomId);
    if (!selectedRoom) return;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut - checkIn;
    const nights = diffTime / (1000 * 60 * 60 * 24);

    if (nights > 0) {
      setTotalPrice((nights * Number(selectedRoom.roomPrice)).toFixed(2));
    } else {
      setTotalPrice("");
    }
  }, [roomId, checkInDate, checkOutDate, roomsData]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuestId(loggedUser._id);
    if (loggedUser.role == "Guest") {

      if (!roomId || !checkInDate || !checkOutDate) {
        toast.error("Please fill all required fields!");
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/addreservation", {
          guestId,
          roomId,
          checkInDate,
          checkOutDate,
          totalPrice,
        });

        toast.success(response.data.message);
        setGuestId("");
        setRoomId("");
        setCheckInDate("");
        setCheckOutDate("");
        setTotalPrice("");
        setOpen(false);
        toast.error(response.data.message);
      } 
      catch (err) {
        toast.error(err.response.data.message);
      }

    }
    else {
      toast.error("Only Guests can fill reservation form");
    }

  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white w-[90%] max-w-3xl p-6 rounded-xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">GUEST RESERVATION</h3>
            <button onClick={() => setOpen(false)} className="text-red-500 text-2xl">
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Reservation Info */}
            <div>
              <select
                name="roomNumber"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              >
                <option value="" disabled>Select Room</option>
                {roomsData.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.roomNumber} — {room.roomType} (${room.roomPrice})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <input
                  name="cin"
                  type="date"
                  min={today}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  name="cout"
                  type="date"
                  min={checkInDate || today}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="border p-2 rounded"
                />
              </div>

              <input
                name="totalPrice"
                type="number"
                value={totalPrice}
                placeholder="Auto-calculated"
                readOnly
                className="w-full border p-2 rounded mt-2"
              />
            </div>

            <div className="col-span-full flex justify-end mt-3">
              <button type="submit" className="px-5 py-2 bg-green-600 text-white rounded-lg">
                Submit Reservation
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default BookingModal;
