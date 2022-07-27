const mongoose = require('mongoose')

const {MONGO_URL} = process.env

exports.connect = ()=>{
    try {
        mongoose.connect(MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        ).then(()=>{
            console.log('DB connected successfully .');
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}