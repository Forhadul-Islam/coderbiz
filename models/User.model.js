const mongoose = require('mongoose');
const {Schema} = mongoose;
const validator = require('validator');
mongoose.Promise = global.Promise;


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username must be provided']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Emali must be provided"],
        validate: [validator.isEmail, 'Email is invalid!']
    },
    password: {
        type: String,
        required: true
    },
    clearance: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'cleaarance is not valid'
        },
        default: 'user'
    }
}, {timestamps: true, versionKey: false})


const User = mongoose.model('User', userSchema);
module.exports = User;