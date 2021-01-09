const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.Promise = global.Promise;


const userSchema = new Schema({
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