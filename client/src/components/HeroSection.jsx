import React from 'react'

const HeroSection = ({ setOpen }) => {
    return (
        <>
            <section id="firstsection" className="relative w-full h-[85vh] overflow-hidden">
                <img
                    src="https://raw.githubusercontent.com/tushar-2223/Hotel-Management-System/refs/heads/main/image/hotel1.jpg"
                    className="w-full h-full object-cover"
                    alt="Hotel"
                />

                {/* Welcome Text */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center">
                    <h1 className="text-white text-4xl font-bold drop-shadow-lg">
                        Welcome to heaven on earth
                    </h1>
                </div>

                {/* Book Now Button */}
                <button
                    onClick={() => setOpen(true)}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                    Book Now
                </button>
            </section>
        </>
    )
}

export default HeroSection