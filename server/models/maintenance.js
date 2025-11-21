const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rooms'
    },
    issue: String,
    resolveStatus: String,
    reportedDate: Date
});


module.exports = mongoose.model('Maintenance', maintenanceSchema);