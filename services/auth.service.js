const User = require('../models/User.model');

exports.createUser = (user) =>{
    return User.create(user)
}

exports.getUserByEmail = (email) => {
    return User.findOne({email: email})
}