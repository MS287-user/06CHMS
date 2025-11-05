const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true
  },
  roomType: {
    type: String,
    enum: ['single', 'double', 'deluxe'],
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'cleaning', 'maintenance', 'reserved'],
    default: 'available'
  },
  pricing: {
    baseRate: {
      type: Number,
      required: true
    },
    peakRate: {
      type: Number
    },
    weekendRate: {
      type: Number
    }
  },
  amenities: [{
    type: String,
    enum: ['wifi', 'tv', 'minibar', 'air conditioning', 'coffee maker']
  }],
  capacity: {
    adults: {
      type: Number,
      required: true,
      default: 2
    },
    children: {
      type: Number,
      default: 0
    }
  },
  bedType: {
    type: String,
    enum: ['single', 'double', 'queen', 'king', 'twin'],
    required: true
  },
  smokingAllowed: {
    type: Boolean,
    default: false
  },
  
  view: {
    type: String,
    enum: ['ocean', 'garden', 'city', 'mountain', 'none']
  },
  description: {
    type: String
  },
  images: [{
    type: String
  }],
  notes: {
    type: String
  }
  
});


module.exports = mongoose.model('Room', roomSchema);

