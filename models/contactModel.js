const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
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