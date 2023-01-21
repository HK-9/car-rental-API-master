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
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
  }).json({ token, user })

    user.password = undefined;
    res.status(code).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  }
};

module.exports = createUserToken;
