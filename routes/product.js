const { Router } = require("express");
const router = Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.post("/", createProduct);
router.put("/:productId", updateProductById);
router.delete("/:productId", deleteProductById);

module.exports = router;
