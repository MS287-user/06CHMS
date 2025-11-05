import React, { useState } from 'react'

const GenerateInvoice = () => {

    const [form, setForm] = useState({
        guestName: "",
        reservationId: "",
        date: "",
        amount: "",
        items: [
            { description: "", amount: "" },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...form.items];
        items[index][name] = value;
        setForm({ ...form, items });
    };

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { description: "", amount: "" }] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Generate new invoice", form);
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-semibold text-gray-800">Generate New Invoice</h1>
                    </div>
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-1">Guest Name</label>
                                <input
                                    type="text"
                                    name="guestName"
                                    value={form.guestName}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Reservation ID</label>
                                <input
                                    type="text"
                                    name="reservationId"
                                    value={form.reservationId}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded text-black"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={form.date}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded text-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={form.amount}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded text-black"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700">Items</h2>
                                {form.items.map((item, idx) => (
                                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-gray-700 mb-1">Description</label>
                                            <input
                                                type="text"
                                                name="description"
                                                value={item.description}
                                                onChange={(e) => handleItemChange(idx, e)}
                                                className="w-full border px-3 py-2 rounded text-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Amount</label>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={item.amount}
                                                onChange={(e) => handleItemChange(idx, e)}
                                                className="w-full border px-3 py-2 rounded text-black"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addItem}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                            >
                                + Add Item
                            </button>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                                >
                                    Save Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenerateInvoice
