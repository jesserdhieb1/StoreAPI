require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')


app.use(errorHandlerMiddleware)
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("<h1>Store API</h1> <a href ='/api/v1/products'>send</a>")
})


app.use(notFoundMiddleware)
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

