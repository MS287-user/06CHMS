import React, { useState } from 'react'

const GuestFeedback = () => {

    const [formData, setFormData] = useState({
            name: "",
            email: "",
            rating: "",
            message: "",
        });
    
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Feedback Submitted:", formData);
            alert("Thank you for your feedback!");
        };


    return (
        <>
            <div  className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center">Hotel Feedback Form</h2>

                    <label className="block mb-3">
                        <span className="text-gray-700 font-medium">Name</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </label>

                    <label className="block mb-3">
                        <span className="text-gray-700 font-medium">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </label>

                    <label className="block mb-3">
                        <span className="text-gray-700 font-medium">Rating</span>
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-lg"
                        >
                            <option value="">Select Rating</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </label>

                    <label className="block mb-4">
                        <span className="text-gray-700 font-medium">Feedback Message</span>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-lg h-28"
                        ></textarea>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </>
    )
}

export default GuestFeedback
