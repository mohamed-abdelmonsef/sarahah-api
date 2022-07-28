const messageModel = require('../models/message.model')
const userModel = require('../models/user.model')





exports.displayMessages = async(req,res,next)=>{
        try {
            let user = await userModel.findOne({_id:req.userId})
            let followingArr = user.following
            let messages = []
            for (let index = 0; index < followingArr.length; index++) {
                const element = followingArr[index];
                let followedUser = await userModel.findOne({_id:element})
                let message = await messageModel.find({userId:followedUser,answered:true})
                for (let index = 0; index < message.length; index++) {
                    const element = message[index];
                    messages.push[element]
                }
            }
            res.status(200).json({messages:messages})     
        } catch (error) {
            if(!error.statusCode){
                error.statusCode = 500
            }
            next(error)            
        }
    }

   