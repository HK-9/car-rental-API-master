const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 90000,
  });
};

const user = User;


const createUserToken = async (user, code, req, res) => {
  try {
    
    const token = signToken(user._id);
    user.password = undefined;
    res.cookie("jwt", token,{sameSite: 'none', httpOnly: true, secure: true}).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({message:'createUserTokenFailed',error})
  }
};

module.exports = createUserToken;
