const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    link: {
        type: String,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, { timestamps: true });

const galleryModel = mongoose.model('gallary', gallerySchema);
module.exports = galleryModel;
