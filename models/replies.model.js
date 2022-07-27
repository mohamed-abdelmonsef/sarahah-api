const mongoose = require('mongoose')
const Schema = mongoose.Schema

const replySchema = new Schema({
    reply:String,
    time:String,
    messageID:{type:mongoose.Schema.Types.ObjectId,ref:'message'},
})

module.exports = mongoose.model('reply' ,replySchema)