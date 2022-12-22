const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/usersController.js");
const { verifyToken } = require("../middlewares/jwt-validator");
const validation = require("../services/dataValidation");
const { usersSchema } = require("../middlewares/schemas/users");

router.get("/", verifyToken, getUsers);
router
  .route("/:userId")
  .get(verifyToken, getUserById)
  .put([verifyToken, validation(usersSchema)], updateUserById)
  .delete(verifyToken, deleteUserById);

module.exports = router;
