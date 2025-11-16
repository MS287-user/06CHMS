import React from 'react'

const RoomsSection = ({ setOpen }) => {

    const rooms = [
        { img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/hotel1photo.webp", name: "Superior Room" },
        { img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/hotel2photo.jpg", name: "Deluxe Room" },
        { img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/hotel3photo.avif", name: "Guest House" },
        { img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/hotel4photo.jpg", name: "Single Room" },
    ];
    return (
        <>
            <section id="secondsection" className="py-16 bg-gray-100">
                <h1 className="text-center text-3xl font-bold mb-10">≼ Our Rooms ≽</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
                    {rooms.map((room) => (
                        <div key={room.name} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img src={room.img} alt={room.name} className="h-40 w-full object-cover" />

                            <div className="p-5">
                                <h2 className="text-xl font-semibold">{room.name}</h2>

                                <button
                                    onClick={() => setOpen(true)}
                                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                                >
                                    Book
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default RoomsSection