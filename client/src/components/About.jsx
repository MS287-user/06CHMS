import React from 'react'

const About = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl text-center">
                    <h1 className="text-4xl font-bold mb-4">About Our Hotel Management System</h1>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Our Hotel Management System is designed to simplify and automate
                        the daily operations of hotels. From room booking to customer management, billing,
                        and housekeeping coordination, our platform ensures smooth and efficient workflow
                        for hotel staff and guests.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Built using modern technologies, it provides a clean, responsive interface,
                        reliable performance, and an easy-to-use dashboard. Whether you manage a small lodge
                        or a large luxury hotel, this system adapts to your needs.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our mission is to make hotel operations smarter, faster, and more efficient
                        through innovation and technology.
                    </p>
                </div>
            </div>
        </>
    )
}

export default About