const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  guestName: String,
  roomNumber: String,
  checkInDate: Date,
  checkOutDate: Date,
  totalDays: Number,
  roomPrice: String,
  additionalCharges: {
    type: Number,
    default: 0
  },
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Billing", billingSchema);
