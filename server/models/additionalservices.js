const mongoose = require('mongoose');

const additionalServiceSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: true,
    unique: true,
    
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
  },
  serviceType: {
    type: String,
    enum: ['room-service', 'laundry', 'wake-up-call', 'transportation', 'spa', 'gym', 'concierge', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'requested'
  },
  scheduledTime: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String
  },
 
  wakeUpTime: {
    type: Date
  },
  wakeUpConfirmed: {
    type: Boolean,
    default: false
  },

  pickupLocation: {
    type: String
  },
  destination: {
    type: String
  },
  vehicleType: {
    type: String
  }

});



module.exports = mongoose.model('AdditionalService', additionalServiceSchema);

