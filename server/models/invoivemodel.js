const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
  },
  
  charges: {
    roomCharges: {
      type: Number,
      required: true,
      default: 0
    },
    serviceCharges: {
      type: Number,
      default: 0
    },
    tax: {
      gst: {
        type: Number,
        default: 0
      },
      serviceTax: {
        type: Number,
        default: 0
      }
    },
    additionalServices: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'AdditionalService'
    },
    lateCheckout: {
      type: Number,
      default: 0
    },
    damages: {
      type: Number,
      default: 0
    }
  },
  subtotal: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    required: true
  },
 
  paymentStatus: {
    type: String,
    enum: ['pending',  'paid' ],
    default: 'pending'
  },
  payments: [{
    amount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'netbanking', 'cheque'],
      required: true
    },
    transactionId: {
      type: String
    },
    paidAt: {
      type: Date,
      default: Date.now
    },
    handleBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  // Invoice details
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String
  }

});


