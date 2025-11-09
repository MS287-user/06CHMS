const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guestName: String,
  guestEmail: String,
  guestPhone: String,
  roomNumber: String,
  checkInDate: Date,
  checkOutDate: Date,
  totalPrice: String,
  status: {
    type: String,
    enum: ['reserved', 'checked_in', 'checked_out', 'cancelled'],
    default: 'reserved'
  }
});
module.exports = mongoose.model("Booking", bookingSchema);

