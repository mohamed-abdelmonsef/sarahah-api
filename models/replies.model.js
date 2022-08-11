const mongoose = require('mongoose')
const Schema = mongoose.Schema

const replySchema = new Schema({
    reply:String,
    messageID:{type:mongoose.Schema.Types.ObjectId,ref:'message'},
},{timestamps : true})

module.exports = mongoose.model('reply' ,replySchema)