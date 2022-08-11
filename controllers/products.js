const Product = require('../models/product')

const getAllProductsStatic = async (req,res)=>{
    const products=await Product.find({featured:true})
    res.status(200).json({products,nbHits:products.length})
}

const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,field} = req.query
    const querryObject={}
    if (featured){
        querryObject.featured=featured==='true'?true:false
    }
    if(company){
        querryObject.company=company
    }
    if(name){
        querryObject.name={$regex:name,$options:'i'}
    }
    let result =  Product.find(querryObject)
    if (sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result=result.sort('createdAt')
    }
    if (field){
        const fieldList = field.split(',').join(' ')
        result = result.select(fieldList)
    }
    const page= Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit
    const products = await result.skip(skip).limit(limit)
    res.status(200).json({products,nbHits:products.length})
}

module.exports = {getAllProductsStatic,getAllProducts}