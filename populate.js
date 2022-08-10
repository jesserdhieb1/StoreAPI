
require('dotenv').config()
const dataProduct = require('./products.json')
const Product = require('./models/product')
const connect = require('./db/connect')

const start = async ()=>{
    try {
        await connect(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(dataProduct)
        console.log('Data implemented :) !')
        process.exit(0)
    }
    catch (err){
        console.log(err)
        process.exit(1 )
    }
}

start()