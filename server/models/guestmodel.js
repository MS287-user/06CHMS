const mongoose =require ('mongoose');
const User = require('./usermodel');
const guestModelSchema = new mongoose.Schema({
 fullName: {
     type: String,
      required: true 
    },
    cnicNo:{
    type: String,
    required: true

    },
    profileImage:{
      type:String,
      default:null


    },
  email: {
     type: String,
     required: true
    },
  phone: {
     type: String,
      required: true
     },
 address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  preferences: {
    bedType: {
         type: String,
         required: true,
            enum: ['Single', 'Double', 'Queen', 'King'],

         }, 

    roomView: {
         type: String,
            enum: ['Sea View', 'Garden View'], 
        }, 
    foodPreferences: { 
        type: String,
        required: true,
        enum: ['Vegetarian', 'Non-Vegetarian'],
        default:'all'
     },
    },
    handleBy: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User" },
  })
module.exports =mongoose.model('Guest',guestModelSchema);