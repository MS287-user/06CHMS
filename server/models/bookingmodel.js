const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest'
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms'
  },
  checkInDate: Date,
  checkOutDate: Date,
  totalPrice: String,
  status: {
    type: String,
    default: 'Reserved'
  }
});
module.exports = mongoose.model("Booking", bookingSchema);

