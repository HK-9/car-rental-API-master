const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const { promisify } = require('util');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const createUserToken = require('../utils/createAccessToken')

exports.register = async(req,res,next) => {
    const {username, password} = req.body;
    console.log("req.body",req.body)
    try {
        const newuser = new User(req.body) ;
        await newuser.save() 
    } catch (error) {
        return res.status(400).json(error); 
    }
}


exports.login = async (req,res)=>{
    const {username, password} = req.body;
        try {
            const jwt = process.env.JWT_SECRET;
            const user = await User.findOne({username}).select('+password');
            const validPassword = await bcrypt.compare(password,user.password);
            if(!user || !(validPassword)) {
                return res.status(400).json({
                    status:'fail',
                    message: "Wrong password or username"
                });     
            }
            createUserToken(user, 200, req, res);
        } catch (error) {
            return res.status(400).json(error);
        }
}


exports.logoutUser = catchAsync(async (req, res) => {
    res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
});
    res.status(200).send('user is logged out');
});
