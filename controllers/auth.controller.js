const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const mailer = require('../emails/setUpMailer')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env
const {validationResult} = require('express-validator')


exports.register= (req,res,next)=>{
    const {name,userName,email,password} = req.body
    try {
        bcrypt.hash(password ,7 ,async(err,hash)=>{
            if (err) {
                err.statusCode = 500
                throw err
            }
            let token = jwt.sign({email},SECRET_KEY)
            let emailContent = {
                from: 'mo7medno7@gmail.com', // sender address
                to: email, 
                subject: "Hello ✔",
                text: "Hello world?", 
                html: `<h1><a href='https://sarahah-api.herokuapp.com/verifyEmail/${token}'> please click here to confirm your email.. </a></h1>`
            }
            mailer.sendMail(emailContent,err=>{
                if (err) {
                    err.statusCode = 500
                    throw err
                }
            })
            await userModel.insertMany({name,userName,email,password:hash})
            res.status(201).json({message:"user registered successfully"})
        })       
        
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.verifyingEmail = (req,res,next)=>{
    try {
        const {token} = req.params
        if(token && token!==null && token!==undefined){
            jwt.verify(token ,SECRET_KEY ,async(err,decoded)=>{
                if (err) {
                    err.statusCode = 401
                    throw err
                }
                
                await userModel.findOneAndUpdate({email:decoded.email},{emailConfirm:true})
                res.status(200).send({message:'confirmed successfully'})
            })
        }else{
            return res.send(403).send({message:"no token provided"})
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.login = (req,res,next)=>{
    const {email,password} = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let error = new Error('invalid inputs')
        error.statusCode = 422
        throw error
    }

    userModel.findOne({email}).exec(async(err,user)=>{
        if (err) {
            err.statusCode = 500
            next(err)
        }
        if(!user){
            return res.status(404).send({message:"user not found"})
        }
        if(!user.emailConfirm){
            return res.send({message:"please confirm your email first"})
        }
        let match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(401).send({message:"invalid pass",accessToken:null})
        }
        let token = jwt.sign({id:user._id},SECRET_KEY,{expiresIn:86400})
        res.status(200).send({
            message:"logged in successfully",
            email:user.email,
            userName:user.userName,
            accessToken:token
        })
    })

}