const express = require('express')
const mongoose  = require('mongoose')
const {isEmail} = require('validator')


const userSchema = new mongoose.Schema(
    {
        email: {
            unique:true,
            required:[true,'email is required'],
            minlength : [6 , 'minimum length is 6'],
            type : String,
            lowercase:true,
            validate:[isEmail,'enter a valid email'],
          
        },
        password:{ 
            type : String,
            required:[true,'password is required'],
            minlength : [20 , 'minimum length is 6'],
        }
    }
)
const userModal =  mongoose.model('users' , userSchema)
module.exports = {
    userModal
}