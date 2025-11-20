import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import RoomsSection from "../components/RoomsSection";
import FacilitiesSection from "../components/FacilitiesSection";
import BookingModal from "../components/BookingModal";
import Footer from '../components/Footer';
import About from '../components/About';
import FeedBackForm from '../components/FeedBackForm';
import { Toaster } from 'react-hot-toast';

const Home = ({ logoutUser }) => {
    const [open, setOpen] = useState(false);

    const countries = [
        "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
        "Pakistan", "India", "China", "Japan", "Sri Lanka", "Nepal", "Bangladesh",
        "United States", "United Kingdom", "Saudi Arabia", "UAE", "Canada"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const values = Object.fromEntries(data.entries());
        console.log("Booking Form Data:", values);
        alert("Reservation Submitted (Frontend Only)");
    };
    return (
        <>
            <div className="w-full min-h-screen bg-gray-50">
                <Navbar logoutUser={logoutUser} />
                <HeroSection setOpen={setOpen} />
                <About/>
                <RoomsSection setOpen={setOpen} />
                <FacilitiesSection setOpen={setOpen} />
                <BookingModal open={open} setOpen={setOpen} handleSubmit={handleSubmit} countries={countries} />

                <Footer />
                <Toaster
                position="top-center"
                reverseOrder={false}
            />
            </div>
        </>
    )
}

export default Home