const validation = require('../validation/index.validation')
const verifyRegister = require('../middleware/verifyRegister')
const controller = require('../controllers/auth.controller')

module.exports = (app)=>{
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept")
        next()
    })

    app.put('/register',[validation.register,verifyRegister],controller.register)

    app.get('/verifyEmail/:token',controller.verifyingEmail)

    app.post('/login',validation.login,controller.login)
}
