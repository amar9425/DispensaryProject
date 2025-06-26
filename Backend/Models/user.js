const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    role: {
        type: String,
        default: 'student',
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    roll: {
        type: String,
    },
    mobileNo:{
        type: String,
        default: ''
    },
    fatherName: {
        type: String,
    },
    fatherMobile: {
        type: String,
    },
    address:{
        type: String,
        default: ''
    },
    preavious_health:{
        type: String,
        default: ''
    },
    age:{
        type: String,
        default: ''
    },
    bloodGroup:{
        type: String,
        default: ''
    },
    designation: {
        type: String,
        default: ''
    },
    resetPasswordToken:{
        type: String,
        default: ''
    },
    resetPasswordExpires:{
        type: Date,
    }

},{timestamps: true})

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;