const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
const {API_KEY} = process.env

var options = {
    auth:{
        api_key:API_KEY
    }
}

module.exports = nodemailer.createTransport(sgTransport(options))