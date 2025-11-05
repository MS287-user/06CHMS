const mongoose = require('mongoose');

const complaintSchema= new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },

  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'requestedByType'
  },
  requestedByType: {
    type: String,
    enum: ['User', 'Guest'],
    default: 'User'
  },
  requestType: {
    type: String,
    enum: ['plumbing', 'electrical', 'hvac', 'furniture', 'appliance', 'general', 'emergency'],
    required: true
  },
  
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  description: {
    type: String,
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  scheduledDate: {
    type: Date
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  estimatedCost: {
    type: Number
  },
  actualCost: {
    type: Number
  },
  notes: {
    type: String
  },
});


module.exports = mongoose.model('Complaint', complaintSchema);

