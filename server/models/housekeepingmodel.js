const mongoose = require('mongoose');

const housekeepingSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
    unique: true,
  
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  taskType: {
    type: String,
    enum: ['cleaning', 'deep-cleaning', 'checkout-cleaning', 'inspection', 'preparation'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
 
  scheduledTime: {
    type: Date,
    required: true
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  notes: {
    type: String
  },
  // Quality check
  inspectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  inspectionStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  // Items checklist
  checklist: {
    bedMaking: {
      type: Boolean,
      default: false
    },
    bathroomCleaning: {
      type: Boolean,
      default: false
    },
    floorCleaning: {
      type: Boolean,
      default: false
    },
    suppliesRestocked: {
      type: Boolean,
      default: false
    },
    trashRemoved: {
      type: Boolean,
      default: false
    },
    minibarChecked: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});



module.exports = mongoose.model('Housekeeping', housekeepingSchema);

