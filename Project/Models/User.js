const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4()
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    firstName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    lastName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    Date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', userSchema);