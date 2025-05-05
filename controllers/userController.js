const { request } = require("express");
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')


//@desc Register a User 
//@route Post /api/users/register
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // 1. Check if user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  // 2. Compare password
  const isMatch = await argon2.verify(user.password,password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  if(user && isMatch){
    const accessToken = jwt.sign(
       {user :{
        userName : user.userName,
        email: user.email,
        id: user.id

       }
       },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.status(200).json({accessToken})
  }
  else{
    res.status(400)
}

   
}
);

//@desc Login a User 
//@route Post /api/users/login
//@access public

const registerUser = asyncHandler(async (req, res) => {
    console.log("the request body is", req.body); 
    const {userName, email, password} = req.body;
    if ( !userName || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory")
    }

    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("email already exists")
    }

    const hashedPassword = await argon2.hash(password)
    // console.log("hashed password", hashedPassword)

    const user = await User.create({
        userName,
        email,
        password:hashedPassword
    })
    res.status(201).json(user);
});


//@desc Current user info
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
   res.json({message: "Current user information"})
});

module.exports = {
    registerUser,loginUser, currentUser
} 