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
    default: 'Reserved'
  }
});
module.exports = mongoose.model("Booking", bookingSchema);

