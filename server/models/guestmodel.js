const mongoose = require('mongoose');
const guestModelSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  role: String,
})
module.exports = mongoose.model('Guest', guestModelSchema);