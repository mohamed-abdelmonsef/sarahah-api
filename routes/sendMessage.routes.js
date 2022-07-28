const controller = require('../controllers/sendMessage.controller')

module.exports = (app)=>{
    app.post('/sendMessage/:userName',controller.sendMessage)
}