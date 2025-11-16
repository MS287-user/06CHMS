import React from 'react'

const FacilitiesSection = ({ setOpen }) => {
    const facilities = [
        { name: "Swimming Pool", img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/swimingpool.jpg" },
        { name: "Spa", img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/spa.jpg" },
        { name: "24*7 Restaurant", img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/food.jpg" },
        { name: "24*7 Gym", img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/gym.jpg" },
        { name: "Heli Service", img: "https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/heli.jpg" },
    ];
    return (
        <>
            <section id="thirdsection" className="py-16 bg-gray-100">
                <h1 className="text-center text-3xl font-bold mb-10">≼ Facilities ≽</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-10">
                    {facilities.map((f, index) => (
                        <div key={f.name + index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img src={f.img} alt={f.name} className="h-40 w-full object-cover" />

                            <div className="p-5 text-center">
                                <h2 className="text-xl font-semibold">{f.name}</h2>

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

export default FacilitiesSection