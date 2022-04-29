const bcrypt = require("bcryptjs/dist/bcrypt");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../Model/userModel");

// register new User
const registerUser = asyncHandler( async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // validation
  if (!firstName || !lastName || !email || !password) {
    res.status(404).json("Please Enter All Fields");
  }

  // validate if user already exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(404).json("User already registered");
  }

  //   encrypt password
  const newPassword = await bcrypt.hash(req.body.password, 10);

  // create new user document
  const user = await User.create({
    firstName,
    lastName,
    email,
    password : newPassword,
  });

  // on succesfull creation of new user document
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  }

  //failed to create document
  else {
    res.status(404).json("Failed To Create The User");
  }
});

// login user
const authUser = asyncHandler( async(req,res) => {
  const { email,password } = req.body;//get data from login form

  // find user from DB by email
  const user = await User.findOne({ email });

  // compare encrypted password
  const isPasswordValid = await bcrypt.compare(password, user.password)

  // on successful login send data
  if (user && isPasswordValid) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id), //generate token for existing user
    });
  }

  // failed to login, send error message
  else {
    res.status(404);
    throw new Error("Invalid Email Or Password");
  }
})

 

module.exports = { registerUser,authUser };
