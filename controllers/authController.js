const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const createUserToken = require('../utils/createAccessToken');
const OtpModel = require('../models/otpModel');
const nodemailer = require('../utils/nodemailer');
const utils = require('../utils/utils');



exports.register = async(req,res,next) => {
    const email = req.body.email;
    try {
        newUserModel = await User.findOne({email})
        if(!newUserModel){
            const newuser = new User(req.body) ;
            const user = await newuser.save() ;
            res.send(newuser);
            return
        }
        if(newUserModel.email === email) res.status(401).json({message:'user already exists'})

    } catch (error) {
        return res.status(400).json(error); 
    }
}


exports.login = async (req,res)=>{
    const {username, password} = req.body;
        try {
            const jwt = process.env.JWT_SECRET;
            const user = await User.findOne({username}).select('+password'); //selected the hidden passcode to ensure security.
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


exports.requestOtp = catchAsync(async (req,res,next)=>{
    const { email } = req.query; 
    console.log("email",email);
    if (!email) return res.status(400).json({ message: 'All fields require' });
    await OtpModel.findOneAndDelete({email:email});
    const otp = Math.floor(1000 + Math.random() * 9000)
    const verifyOtp = new OtpModel({
        email, otp
    })
    await verifyOtp.save()
    nodemailer.sendOtp(email, otp)
    res.status(200).json({ message: 'otp send successfully' })
})

exports.verifyOtp = async(req,res,next)=>{
    try {  
        const user = JSON.parse(req.body.user)
        const { reqObj } = req.body;
        const email = user.email
        const otp = reqObj;
        const found = await OtpModel.findOne({email:email});
        if (!found) return res.status(401).json({ message: 'something went wrong' });
        if (found.otp !== otp) return res.status(403).json({ message: 'invalid otp' });
        const newUserModel = await User.findOne({ email })
        newUserModel.isVerified = true;
        newUserModel.save();
        await OtpModel.findOneAndDelete({ email });
        res.status(200).json({ status: 'ok', message: "otp verified successfully", verified: true })
    } catch (error) {
        console.log('varify otp route error:',error)
}
}

exports.logoutUser = catchAsync(async (req, res) => {
    res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
});
    res.status(200).send('user is logged out');
});