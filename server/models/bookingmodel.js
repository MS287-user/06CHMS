import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  guestFullname: {
     type: mongoose.Schema.Types.ObjectId,
     
     ref: "Guest",
      required: true 
    },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", 
    required: true
 },
  bookedBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User" 
}, 
  checkInDate: { 
    type: Date,
     required: true 
    },
  checkOutDate: { 
    type: Date,
     required: true
     },
  status: {
    type: String,
    enum: ["reserved", "checked-in", "checked-out", "cancelled"],
    default: "reserved",
  },
  totalAmount: { 
    type: Number 
},
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },

});

module.exports = mongoose.model("Booking", bookingSchema);
