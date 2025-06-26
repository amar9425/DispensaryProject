const mongoose = require('mongoose');

const nearByHospitalSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, { timestamps: true });

const nearByHospitalModel = mongoose.model('nearByHospital', nearByHospitalSchema);
module.exports = nearByHospitalModel;