const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/usersController.js");
//const { verifyToken } = require("../middlewares/authJwt");
const validation = require("../services/dataValidation");
const { usersSchema } = require("../middlewares/schemas/users");

router.get("/" /* verifyToken*/, getUsers);
router.get("/:userId" /* verifyToken*/, getUserById);
router.put(
  "/:userId",
  [/* verifyToken*/ validation(usersSchema)],
  updateUserById
);
router.delete("/:userId" /* verifyToken*/, deleteUserById);

module.exports = router;
