const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    userName:String,
    email:String,
    password:String,
    followers:Array,
    following:Array,
    emailConfirm:{type:Boolean ,default:false},
    messages:[{type:mongoose.Schema.Types.ObjectId,ref:'message'}]
})

module.exports = mongoose.model('user' ,userSchema)