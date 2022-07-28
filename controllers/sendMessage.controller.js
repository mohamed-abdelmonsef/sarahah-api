const userModel = require('../models/user.model')
const messageModel = require('../models/message.model')


exports.sendMessage = async(req,res,next)=>{
    try {
        let userName = req.params.userName
        let user = await userModel.findOne({userName})  
        if (!user) {
            return res.status(404).send({message:"user not found or wrong userName"});
        }
        await messageModel.insertMany({
            message:req.body.message,
            time:Date.now(),userId:user._id
        }).then(()=>{
            res.status(200).send({message:"sent successfully"})
        })                     
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)       
    }
}