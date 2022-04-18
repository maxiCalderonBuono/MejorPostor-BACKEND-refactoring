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

router.get("/", [verifyToken, isModerator], getProducts);
router.get("/:productId", [verifyToken, isModerator], getProductById);
router.get("/user/:userId", [verifyToken, isModerator], getProductsByUser);
router.post("/", [verifyToken, isModerator], createProduct);
router.put("/:productId", [verifyToken, isModerator], updateProductById);
router.delete("/:productId", [verifyToken, isModerator], deleteProductById);

module.exports = router;
