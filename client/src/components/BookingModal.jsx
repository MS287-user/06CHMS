import React from 'react'

const BookingModal = ({ open, setOpen, handleSubmit, countries }) => {
    if (!open) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-white w-[90%] max-w-3xl p-6 rounded-xl shadow-xl">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">RESERVATION</h3>
                        <button onClick={() => setOpen(false)} className="text-red-500 text-2xl">&times;</button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Guest Info */}
                        <div>
                            <h4 className="font-semibold mb-2">Guest Information</h4>

                            <input name="Name" type="text" placeholder="Enter Full Name"
                                className="w-full border p-2 rounded mb-2" />

                            <input name="Email" type="email" placeholder="Enter Email"
                                className="w-full border p-2 rounded mb-2" />

                            <select name="Country" className="w-full border p-2 rounded mb-2">
                                <option>Select your country</option>
                                {countries.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>

                            <input name="Phone" type="text" placeholder="Enter Phone number"
                                className="w-full border p-2 rounded mb-2" />
                        </div>

                        {/* Reservation Info */}
                        <div>
                            <h4 className="font-semibold mb-2">Reservation Information</h4>

                            <select name="RoomType" className="w-full border p-2 rounded mb-2">
                                <option>Type of Room</option>
                                <option>Superior Room</option>
                                <option>Deluxe Room</option>
                                <option>Guest House</option>
                                <option>Single Room</option>
                            </select>

                            <select name="Bed" className="w-full border p-2 rounded mb-2">
                                <option>Bedding Type</option>
                                <option>Single</option>
                                <option>Double</option>
                                <option>Triple</option>
                            </select>

                            <select name="NoofRoom" className="w-full border p-2 rounded mb-2">
                                <option>No. of Room</option>
                                <option>1</option>
                            </select>

                            <select name="Meal" className="w-full border p-2 rounded mb-2">
                                <option>Meal</option>
                                <option>Room Only</option>
                                <option>Breakfast</option>
                                <option>Half Board</option>
                                <option>Full Board</option>
                            </select>

                            <div className="grid grid-cols-2 gap-2">
                                <input name="cin" type="date" className="border p-2 rounded" />
                                <input name="cout" type="date" className="border p-2 rounded" />
                            </div>
                        </div>

                        <div className="col-span-full flex justify-end mt-3">
                            <button className="px-5 py-2 bg-green-600 text-white rounded-lg">
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default BookingModal