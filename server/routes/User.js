const express = require('express')
const {validateToken} = require('../JWT')
const {accesProfile, register , login} =require('../controller/user')
const userRoute = express.Router()
userRoute.post('/register' ,(req,res) => {register(req,res)})
userRoute.post('/login' ,(req,res) => {login(req,res)})
userRoute.get('/profile' ,validateToken, (req,res) => accesProfile(req,res))
module.exports = {userRoute}