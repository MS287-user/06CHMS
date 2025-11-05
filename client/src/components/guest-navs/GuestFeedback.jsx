import React, { useState } from 'react'

const GuestFeedback = () => {

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting feedback", { rating, comment });
        setComment("");
        setRating(5);
    };


    const pastFeedbacks = [
        {
            id: 1,
            rating: 4,
            comment: "Lovely stay and friendly staff.",
            date: "2025-10-15",
        },
        {
            id: 2,
            rating: 5,
            comment: "Room was clean and breakfast was amazing!",
            date: "2025-10-20",
        },
    ];

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Leave Feedback</h1>
                    </div>
                    <div className="px-6 py-6 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Your Rating</label>
                                <select
                                    name="rating"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="w-full border px-3 py-2 rounded text-black"
                                >
                                    {[5, 4, 3, 2, 1].map((r) => (
                                        <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Comment</label>
                                <textarea
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    placeholder="Write your experience..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                            >
                                Submit Feedback
                            </button>
                        </form>

                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-gray-700">Your Past Feedbacks</h2>
                            <div className="space-y-4 mt-4">
                                {pastFeedbacks.map((fb) => (
                                    <div key={fb.id} className="border border-gray-200 rounded p-4 bg-gray-50">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-black ">Rating: {fb.rating} / 5 </span>
                                            <span className="text-sm text-gray-500">{fb.date}</span>
                                        </div>
                                        <p className="text-gray-700">{fb.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GuestFeedback
