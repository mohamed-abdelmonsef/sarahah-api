const authJwt = require('../middleware/authJwt')
const controller = require("../controllers/home.controller")



module.exports = (app)=>{
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept")
        next()
    })

    app.get('/home',authJwt,controller.displayMessages)
}