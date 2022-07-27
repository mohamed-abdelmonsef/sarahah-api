const messageModel = require('../models/message.model')



exports.displayMessages = async(req,res,next)=>{
        try {
            let messages = await messageModel.find({userId:req.userId})
            res.status(200).send(messages)     
        } catch (error) {
            if(!error.statusCode){
                error.statusCode = 500
            }
            next(error)            
        }
    }

exports.shareLink = (req,res)=>{
    let fullLink = req.protocol +'://' +req.headers.host+'/sendMessage/'+req.userId
    res.status(200).send(fullLink)
}    