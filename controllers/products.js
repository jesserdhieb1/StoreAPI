const Product = require('../models/product')

const getAllProductsStatic = async (req,res)=>{
    const products=await Product.find({featured:true})
    res.status(200).json({products,nbHits:products.length})
}

const getAllProducts = async (req,res)=>{
    const {featured,company,name} = req.query
    const querryObject={}
    if (featured){
        querryObject.featured=featured==='true'?true:false
    }
    if(company){
        querryObject.company=company
    }
    if(name){
        querryObject.name=name
    }
    const products = await Product.find(querryObject)
    res.status(200).json({products,nbHits:products.length})
}

module.exports = {getAllProductsStatic,getAllProducts}