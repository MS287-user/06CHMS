const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  roomType: String,
  roomPrice: String,
  roomStatus: String
});


module.exports = mongoose.model('Rooms', roomSchema);

