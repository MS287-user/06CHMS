import React from 'react'
import { useParams } from 'react-router-dom';

const ReservationDetails = () => {

    const { id } = useParams();

    const dummyReservation = {
        id: 1,
        guestName: "John Doe",
        roomNumber: "202",
        checkIn: "2025-11-05",
        checkOut: "2025-11-10",
        status: "Reserved",
        guestsCount: 2,
        roomType: "Deluxe",
        pricePerNight: "$150",
        totalBill: "$750",
        notes: "Late arrival at night",
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800 ">
                            Reservation Details (ID: {id})
                        </h1>
                    </div>
                    <div className="px-6 py-6 space-y-4">
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Guest Information</h2>
                            <p className='text-black font-extralight'>Name: {dummyReservation.guestName}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Room Information</h2>
                            <p className='text-black font-extralight'>Room #: {dummyReservation.roomNumber}</p>
                            <p className='text-black font-extralight'> Type: {dummyReservation.roomType}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Dates</h2>
                            <p className='text-black font-extralight'>Check-In: {dummyReservation.checkIn}</p>
                            <p className='text-black font-extralight'>Check-Out: {dummyReservation.checkOut}</p>
                            <p className='text-black font-extralight'>Guest Count: {dummyReservation.guestsCount}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Billing</h2>
                            <p className='text-black font-extralight'>Price per night: {dummyReservation.pricePerNight}</p>
                            <p className='text-black font-extralight'>Total Bill: {dummyReservation.totalBill}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Status & Notes</h2>
                            <p className='text-black font-extralight'>Status: {dummyReservation.status}</p>
                            <p className='text-black font-extralight'>Notes: {dummyReservation.notes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationDetails
