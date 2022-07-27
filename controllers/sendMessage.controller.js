const userModel = require('../models/user.model')
const messageModel = require('../models/message.model')


exports.sendMessage = async(req,res,next)=>{
    try {
        let userId = req.params.id
        let user = await userModel.findOne({_id : userId})  
        if (!user) {
            return res.status(404).send({message:"user not found or wrong id"});
        }
        await messageModel.insertMany({
            message:req.body.message,
            time:Date.now(),userId
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