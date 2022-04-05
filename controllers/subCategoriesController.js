const SubCategory = require("../models/SubCategory");

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.aggregate([
      //Obtención de modelos relacionados
      {
        $lookup: {
          from: "category",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
    ]);
    res.status(200).json({ subCategories: subCategories });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const id = req.parms.subCategoryId;
    const subCategory = await SubCategory.findById(id);
    res.status(200).json({ subCategory: subCategory });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updateSubCategoryById = async (req, res) => {
  try {
    const id = req.params.subCategoryId;
    const obj = req.body;
    const updateSubCategory = await SubCategory.findByAndUpdate(id, obj, {
      new: true,
    });
    res.status(200).json({ updateSubCategory: updateSubCategory });
  } catch {
    res.status(400).json({ error: error });
  }
};

exports.deleteSubCategoryById = async (req, res) => {
  try {
    const id = req.params.subCategoryId;
    await SubCategory.updateOne({ _id: id }, { $set: { deleted: true } });
    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
