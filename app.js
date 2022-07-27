const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
require('dotenv').config()

//START of Importing routes
require('./routes/auth.routes')(app)
require('./routes/home.routes')(app)
require('./routes/sendMessage.routes')(app)
require('./routes/profile.routes')(app)
//END of Importing routes

//Start of documentation
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./documentation/api.yaml')
app.use('/api-docs',swaggerUi.serve ,swaggerUi.setup(swaggerJsDocs))
//End of documentation

//START error handler
app.use((error,req,res,next)=>{
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({message:message})
})
//END error handler

//START db connection
require('./config/DBconnection').connect()
//END db connection

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server running on port number ${port} `);
})