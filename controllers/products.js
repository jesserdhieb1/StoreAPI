const Product = require('../models/product')

const getAllProductsStatic = async (req,res)=>{
    const products=await Product.find({featured:true})
    res.status(200).json({products,nbHits:products.length})
}

const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,field,numericFilters} = req.query
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
    const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    const options=['price','rating']
    filters = filters.split(',').forEach((item)=>{
        const[field,operator,value]=item.split('-')
        if (options.includes(field)){
            querryObject[field]={[operator]:Number(value)}
        }
    })
    console.log(filters)
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