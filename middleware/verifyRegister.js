const {validationResult} = require('express-validator')
const userModel = require('../models/user.model')

module.exports = async(req,res,next)=>{
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let error = new Error(`invalid inputs`)
        error.statusCode = 422
        next(error)
    }
    try {
        let user = await userModel.findOne({email:req.body.email})
        if (user) {
            if (user.emailConfirm) {
                return res.status(400).json({message:'this email is already exist..!!'})   
            }            
        }
        next()        
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)
    }
}