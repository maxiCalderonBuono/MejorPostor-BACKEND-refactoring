const { Router } = require("express");
const router = Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByUser,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.get("/user/:userId", getProductsByUser);
router.post("/", createProduct);
router.put("/:productId", updateProductById);
router.delete("/:productId", deleteProductById);

module.exports = router;
