const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: [true,"Please add the username"],
   
    },
    email: {
      type: String,
      required: [true,"please add an email"],
      unique: [true,"email already exists"]

    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
 
  },
  {
    timestamps: true,
  });

  module.exports = mongoose.model("User", userSchema)