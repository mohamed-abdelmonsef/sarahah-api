const messageModel = require('../models/message.model')
const userModel = require('../models/user.model')





exports.displayMessages = async(req,res,next)=>{
        try {
            let user = await userModel.findOne({_id:req.userId})
            let followingArr = user.following
            let messagesArr = []
            for (let index = 0; index < followingArr.length; index++) {
                const element = followingArr[index];
                let message = await messageModel.find({userId:element,answered:true})
                messagesArr = messagesArr.concat(message)
            }
            res.status(200).json({messages:messagesArr})     
        } catch (error) {
            if(!error.statusCode){
                error.statusCode = 500
            }
            next(error)            
        }
    }