

const getAllProductsStatic = async (req,res)=>{
    throw  Error('testing async');
    res.status(200).json({msg:"testing get all route"})
}

const getAllProducts = async (req,res)=>{
    res.status(200).json({msg:"products route"})
}

module.exports = {getAllProductsStatic,getAllProducts}