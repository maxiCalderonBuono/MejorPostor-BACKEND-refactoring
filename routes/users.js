const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/usersController.js");

router.get("/", getUsers);
router.get("/:usersId", getUserById);
router.put("/:usersId", updateUserById);
router.delete("/:usersId", deleteUserById);

module.exports = router;
