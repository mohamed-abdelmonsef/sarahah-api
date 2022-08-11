const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    message:String,
    answered:{type:Boolean,default:false},
    replies:[{type:mongoose.Schema.Types.ObjectId,ref:'reply'}],
    userId:{type:mongoose.Schema.Types.ObjectId ,ref:'user'}
},{timestamps : true})

module.exports = mongoose.model('message' ,messageSchema)