const Product = require("../models/Product");
const User = require("../models/User");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      initialPrice,
      category,
      location,
      id,
      duration,
      highestBid,
      bidUser,
    } = req.body;

    console.log(bidUser);

    const user = await User.findById(id);

    const highestBidUser = await User.findById(bidUser);

    const newProduct = new Product({
      name,
      image,
      description,
      initialPrice,
      category,
      location,
      duration,
      highestBid,
      user: user._id,
      bidUser: highestBidUser._id,
    });

    await newProduct.save();

    user.products = user.products.concat(newProduct._id);

    await user.save();

    res.status(200).json({ message: "Auction created successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getProducts = async function (req, res) {
  try {
    const products = await Product.aggregate([
      //Obtención de modelos relacionados
      {
        $lookup: {
          from: "users",
          localField: "bidUser",
          foreignField: "_id",
          as: "bidUserData",
        },
      },
    ]);
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getProductById = async function (req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).aggregate([
      //Obtención de modelos relacionados
      {
        $lookup: {
          from: "users",
          localField: "bidUser",
          foreignField: "_id",
          as: "bidUserData",
        },
      },
    ]);
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updateProductById = async function (req, res) {
  console.log("params", req.params, "body", req.body);
  try {
    const { productId } = req.params;
    const obj = req.body;
    const updateProduct = await Product.findByIdAndUpdate(productId, obj, {
      new: true,
    });
    res.status(200).json({ updateProduct: updateProduct });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.deleteProductById = async function (req, res) {
  try {
    const { productId } = req.params;
    await Product.updateOne({ _id: productId }, { $set: { deleted: true } });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getProductsByUser = async function (req, res) {
  try {
    const { userId } = req.params;
    const products = await Product.find({ user: userId });
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//
