const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name: {
      type: String,
      required: [true,"Please add the name"],
   
    },
    email: {
      type: String,
      required: [true,"please add an email"],

    },
 
  });

  module.exports = mongoose.model("Contact", contactSchema)