const mongoose = require('mongoose');

const cleaningSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rooms'
    },
    cleaningStatus: String,
    reportedDate: Date
});


module.exports = mongoose.model('Cleaning', cleaningSchema);