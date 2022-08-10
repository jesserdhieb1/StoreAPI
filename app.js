require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
app.use(express.json())


const url = process.env.MONGO_URI
const port = process.env.PORT || 5000

const connect= async ()=>{
    try{
        await connectDB(url)
        app.listen(port,()=>{
            console.log(`connected on port ${port}`)
        })
    }
    catch (error){
        console.log(error)
    }
}

connect();

