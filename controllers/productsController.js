const Product = require("../models/Product");

exports.getProducts = async(req, res) => {
    try{
       const products = await Product.aggregate([ //Obtención de modelos relacionados
           {
               $lookup: {   
                   from: "categories",
                   localField: "categories",
                   foreignField: "_id",
                   as: "roles"
               },
               $lookup: {
                   from: "subCategories",
                   localField: "subCategories",
                   foreignField: "_id",
                   as: "subCategories"
               },
               $lookup: {
                   from: "users",
                   localField: "users",
                   foreignField: "users",
                   as: "users"
               }
           }
       ]);
       res.status(200).json({ products })
    }catch(error){
        res.status(400).json({error: error});
    }
};

exports.getProductById = async(req, res) => {
    try{
        const id = req.parms.productId;
        const product = await Product.findById(id);
        res.status(200).json({product: product});
    }catch(error){
        res.status(400).json({error: error});
    }
};

exports.updateProductById = async(req, res) => {
    try{
        const id: req.params.productId;
        const obj = req.body;
        const updateProduct = await Product.findByAndUpdate(id,obj, {new: true});
        res.status(200).json({ updateProduct: updateProduct });
    }catch{
        res.status(400).json({error: error})
    }
};

exports.deleteProductById = async (req, res) => {
  try {
    const id = req.params.productId;
    await Product.updateOne({ _id: id }, { $set: { deleted: true } });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
