const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
})

mongoose.model('users', userSchema); //here user is the name of database collection

module.exports=mongoose.model('users')