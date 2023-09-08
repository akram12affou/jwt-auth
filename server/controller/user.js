const express = require('express');
const {createToken} = require('../JWT')
const bcrypt = require('bcrypt');
const {userModal} = require('../models/users');
const accesProfile = (req,res) => {res.json('hey')}

const register = async (req , res) => {
    const {email , password} = req.body
    try{
        if(password === ""){
          res.status(400).json('password is required ')
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        const newUser =  new userModal({email , password:hashedPassword})
        await newUser.save() 
        res.status(201).json('user created !')
        return;
      }catch(err){
         if(err.code === 11000){
          res.status(400).json('email already existed')
          return;
         }else{
          res.status(400).json(err) 
          return;
         }
      } 
}
const login = async (req , res) => {
    try{
        const {email,password} = req.body 
        const user = await userModal.findOne({email})
        if(!user)   res.json('user Not Found') 
        const dbPassword = user.password
      
        bcrypt.compare(password, dbPassword).then((result) => {
          if(result){
            const accessToken = createToken(req);
             
          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
          })
            res.json("Logged IN")
          }else{
            res.json("password incorrect")
          }
        }).catch(err => {
          console.log(err)
        })
         }catch(err){
         console.log(err)
      } 
}
module.exports = {accesProfile,register,login}