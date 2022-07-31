const messageModel = require('../models/message.model')
const Reply = require('../models/replies.model')
const userModel = require('../models/user.model')
let followed = false

//START show messages that have no replies yet
exports.privateQuestions = async(req,res,next)=>{
    try {
        let messages = await messageModel.find({userId:req.userId,answered:false})
        res.status(200).send(messages)     
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)            
    }
}
//END show messages that have no replies yet


//START sending replies to message
exports.replyMessage = async(req,res,next)=>{
    let messageID = req.params.id
    try {
        let message = await messageModel.findOne({_id:messageID,userId:req.userId})
        if (!message) {
            return res.status(404).json({message:'this message not found or not authorized to replay on this'})
        }
        const reply = new Reply({reply:req.body.reply,time:Date.now(),messageID})
        reply.save().then(async(result)=>{
            await messageModel.updateMany({_id:messageID},{$push:{replies:reply},answered:true})
            res.status(201).json({message:"replied successfully"})
        })
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)            
    }
}
//END sending replies to message


//START show messages that have replies
exports.showProfile = async(req,res,next)=>{
    let userName = req.params.userName
    try {
        let user = await userModel.findOne({userName})
        if (!user) {
            return res.status(404).json({message:'this user not exist'})
        }
        followed = user.followers.includes(req.userId)      
        let messages = await messageModel.find({userId:user._id,answered:true})
        res.status(200).send({messages:messages,followed:followed})    
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)            
    }
}
//END show messages that have replies


//START of show replies for one message
exports.showReplies = async(req,res,next)=>{
    let messageID = req.params.messageId
    try {
        let message = await messageModel.findOne({_id:messageID})
        if(!message){
            return res.status(404).json({message:"this message not exist or wrong id"})
        }
        let replies =await Reply.find({messageID})
        res.status(200).json({mainMessage:message,replies:replies})

    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)            
    }
}
//END of show replies for one message

exports.shareLink = async(req,res)=>{
    let user = await userModel.findOne({_id:req.userId})
    let fullLink = req.protocol +'://' +req.headers.host+'/sendMessage/' + user.userName
    res.status(200).send(fullLink)
} 

////////////////////////////////////follow - unfollow

exports.follow = async(req,res,next)=>{
    try {
        if(followed){
            return res.status(200).json({message:'you followed him already'})  
        }
        let userName = req.params.userName
        let user = await userModel.findOne({userName})
        await userModel.updateOne({_id:user._id},{$push:{followers:req.userId}})
        await userModel.updateOne({_id:req.userId},{$push:{following:user._id}})
        followed = true
        res.status(200).json({message:`you followed ${user.userName}`})
    } catch (error) {
        {
            if(!error.statusCode){
                error.statusCode = 500
            }
            next(error)            
        } 
    }
}

exports.unfollow = async(req,res,next)=>{
    try {
        if(!followed){
            return res.status(200).json({message:`you unfollowed him already`})
        }
        let userName = req.params.userName
        let user = await userModel.findOne({userName})
        await userModel.updateOne({_id:user._id},{$pull:{followers:req.userId}})
        await userModel.updateOne({_id:req.userId},{$pull:{following:user._id}})
        followed = false
        res.status(200).json({message:`you unfollowed ${user.userName}`}) 
    } catch (error) {
        {
            if(!error.statusCode){
                error.statusCode = 500
            }
            next(error)            
        } 
    }
}
