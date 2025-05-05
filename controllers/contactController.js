const { request } = require("express");
const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel')


//@desc Get Contact
//@route GET /api/contacts/:id
//@access public

const getContacts = asyncHandler(async (req, res) => {
    const contactModel = await Contact.find({user_id:req.user.id})
    res.status(200).json({contactModel});
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contactModel = await Contact.findById(req.params.id)
    if (!contactModel){
        res.status(404)
        throw new Error()  
    }
    if (contactModel.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission")

    }
    const update = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(update);
})
//@desc Create Contact
//@route POST /api/contacts/:id
//@access public

const createContact =asyncHandler(async (req, res) => {
    console.log("the request body is", req.body); 
    const {name, email} = req.body;
    if (!name || !email){
        res.status(400);
        throw new Error("all fields are mandatory")
    }

    const contact = await Contact.create({
        name,email,
        user_id:req.user.id
    })
    res.status(201).json(contact);
})
//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    const contactModel = await Contact.findById(req.params.id)
    if (contactModel.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission")

    }
    
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("Contact not found")  
    }
    
    console.log("delete works")
     
})

//@desc Get a particular Contact
//@route GET /api/contacts/:id
//@access public

const getContact =asyncHandler(async(req,res) => {
    console.log(req.params.id)
    const contactModel = await Contact.findById(req.params.id)
    if (!contactModel){
        res.status(404)
        throw new Error()  
    }
})




module.exports ={
    getContacts,updateContact,createContact,deleteContact,getContact
}