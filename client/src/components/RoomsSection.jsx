import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const RoomsSection = ({ setOpen }) => {
    const [roomsData, setRoomsData] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getroom");
            console.log(response.data);
            setRoomsData(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRooms();
    }, [])


    return (
        <>
            <section id="secondsection" className="py-16 bg-gray-100">
                <h1 className="text-center text-3xl font-bold mb-10">≼ Our Rooms ≽</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
                    {roomsData.map((room) => (
                        <div key={room.roomNumber} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img src={"https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/hotel2photo.jpg"} alt={room.roomType} className="h-40 w-full object-cover" />

                            <div className="p-5">
                                <h2 className="text-center text-xl font-semibold">{room.roomType}</h2>
                                <p className="text-center text-lg text-gray-700 leading-relaxed mb-6">
                                    {`$${room.roomPrice}`}
                                </p>
                                {loggedUser ?
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                                    >
                                        Book
                                    </button>
                                    :
                                    <button
                                        onClick={() => toast.error("Login first to book a room")}
                                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                                    >
                                        Book
                                    </button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default RoomsSection