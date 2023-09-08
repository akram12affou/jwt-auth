const express = require('express')
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose')
const {userRoute} = require('./routes/User')
const app = express();
app.use(cookieParser()); 
app.use(express.json());
app.use('/auth', userRoute) 
app.listen(5000,() => {
    mongoose.connect('mongodb+srv://akramaffou:akramaffou@cluster0.ft25gqp.mongodb.net/auth').then((res ) => {
        console.log('connect')
    })
})
    