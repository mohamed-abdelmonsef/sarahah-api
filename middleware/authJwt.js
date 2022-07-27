const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env ;

module.exports = (req,res,next)=>{
    let token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({message:"no token provided..!"})
    }
    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
        if (err) {
            err.message = 'Unauthorized'
            err.statusCode = 401
            throw err
        }
        req.userId = decoded.id
        next()
    })
}