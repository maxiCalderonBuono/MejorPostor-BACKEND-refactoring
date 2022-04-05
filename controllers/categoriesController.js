const Category = require("../models/Category");

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.parms.categoryId;
    const category = await Category.findById(id);
    res.status(200).json({ category: category });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updateCategoryById = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const obj = req.body;
    const updateCategory = await Category.findByAndUpdate(id, obj, {
      new: true,
    });
    res.status(200).json({ updateCategory: updateCategory });
  } catch {
    res.status(400).json({ error: error });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.categoryId;
    await Category.updateOne({ _id: id }, { $set: { deleted: true } });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
