const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   address: String,
   password: String,
   profileImage: String,
   role: String
})
module.exports = mongoose.model('Users', userSchema);