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
const { verifyToken, isModerator, isAdmin } = require("../middlewares/authJwt");
const validation = require("../services/dataValidation");
const { productSchema } = require("../middlewares/schemas/products");

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.get("/user/:userId", /* [verifyToken, isModerator],*/ getProductsByUser);
router.post("/", [verifyToken, validation(productSchema)], createProduct);
router.put("/:productId", /*[verifyToken, isModerator],*/ updateProductById);
router.delete(
  "/:productId",
  /* [verifyToken, isModerator],*/ deleteProductById
);

module.exports = router;
