const authService = require('../services/auth.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = process.env.JWT_EXPIRATION_NUM;
const NODE_ENV = process.env.NODE_ENV;

const hashPassword = (password, soltRound) =>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password, soltRound, (err, hash) =>{
            if(err) reject(err)
            resolve(hash)
        })
    })
}

//generating token
const getToken = (id) =>{
    return jwt.sign({id},
            JWT_SECRET, 
            {expiresIn: JWT_EXPIRES}
        )
}

//function for sending
const sendToken = (user, statusCode, req, res) =>{
    const token = getToken(user._id);
    const options = {
        expires: new Date(Date.now() + JWT_EXPIRATION_NUM),
        secure: NODE_ENV === 'production',
        httpOnly: NODE_ENV === 'production',
    };
    res.cookie('jwt', token, options);
    res.status(statusCode).json({
        status: 'success',
        user, 
        token
    })
}

exports.createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const {username, email, password}  = req.body;
        if(!username){
            return next(new ErrorHandler(400, 'You must fill your username!'));
         }
         if(!email || !password){
            return next(new ErrorHandler(400, 'Please enter an email and password!'));
         }
         if(password.length < 7){
            return next(new ErrorHandler(401, "Ops! Password must be at least 7 characters"))
         }
        const soltRound = await bcrypt.genSalt(10)    
        userData.password = await hashPassword(password, soltRound)
        const newUser = await authService.createUser(userData);
        newUser.password = null;
        sendToken(newUser, 201, req, res)
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message)
    }
}

exports.logout = async (req, res, next) =>{
    try {
        const options = {
            expires: new Date(Date.now() + 10000),
            secure: NODE_ENV === 'production',
            httpOnly: NODE_ENV === 'production',
        };
        res.cookie('jwt', 'ExpiredToken', options);
        res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        next(err)
    }
}

