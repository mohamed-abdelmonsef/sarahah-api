const authJwt = require('../middleware/authJwt')
const controller = require('../controllers/profile.controller')


module.exports = (app)=>{
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept")
        next()
    })

    app.get('/profile/privateQuestions',authJwt,controller.privateQuestions)

    app.post('/profile/privateQuestions/:id',authJwt,controller.replyMessage)

    app.get('/profile/:userName',authJwt,controller.showProfile)

    app.get('/replies/:messageId',authJwt,controller.showReplies)

    app.get('/shareLink/:userName',authJwt ,controller.shareLink)

    app.get('/follow/:userName',authJwt,controller.follow)
    app.get('/unfollow/:userName',authJwt,controller.unfollow)

}