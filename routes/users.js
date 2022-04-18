const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/usersController.js");
const { isModerator, isAdmin, verifyToken } = require("../middlewares/authJwt");
const validation = require("../services/dataValidation");
const { usersSchema } = require("../middlewares/schemas/users");

router.get("/", /*[verifyToken, isModerator],*/ getUsers);
router.get("/:userId", /*[verifyToken, isModerator],*/ getUserById);
router.put(
  "/:userId",
  // [verifyToken, isModerator, validation(usersSchema)],
  updateUserById
);
router.delete("/:userId", /*[verifyToken, isModerator],*/ deleteUserById);

module.exports = router;
