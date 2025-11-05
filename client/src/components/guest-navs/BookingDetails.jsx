import React from 'react'
import { useParams } from 'react-router-dom';

const BookingDetails = () => {

    const { id } = useParams();

    const dummyBooking = {
        id: 1,
        roomNumber: "305",
        roomType: "Deluxe Suite",
        checkIn: "2025-12-10",
        checkOut: "2025-12-15",
        status: "Confirmed",
        totalAmount: "$750",
        guestName: "John Doe",
        specialRequests: "Ocean view, early check-in",
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Booking Details (ID: {id})
                        </h1>
                    </div>
                    <div className="px-6 py-6 space-y-4">
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">
                                Guest Information
                            </h2>
                            <p className='text-black font-light'>Name: {dummyBooking.guestName}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">
                                Room Information
                            </h2>
                            <p className='text-black font-light'>Room #: {dummyBooking.roomNumber}</p>
                            <p className='text-black font-light'>Type: {dummyBooking.roomType}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Dates</h2>
                            <p className='text-black font-light'>Check-In: {dummyBooking.checkIn}</p>
                            <p className='text-black font-light'>Check-Out: {dummyBooking.checkOut}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Status & Payment</h2>
                            <p className='text-black font-light'>Status: {dummyBooking.status}</p>
                            <p className='text-black font-light'>Total Amount: {dummyBooking.totalAmount}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Special Requests</h2>
                            <p className='text-black font-light'>{dummyBooking.specialRequests}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingDetails
