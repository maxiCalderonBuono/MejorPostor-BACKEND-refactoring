const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  verify,
  verified,
  revalidarToken,
} = require("../controllers/authController");
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require("../middlewares/validationSignup");
const { verifyToken } = require("../middlewares/authJWT");
const validation = require("../services/dataValidation");
const { signUpSchema, signInSchema } = require("../middlewares/schemas/auth");

router.post("/signin", validation(signInSchema), signIn);

router.post(
  "/signup",
  [checkRolesExisted, checkDuplicateUsernameOrEmail, validation(signUpSchema)],
  signUp
);

router.get("/verify/:uid", verify);
router.get("/verified", verified);
router.get("/renew", verifyToken, revalidarToken);

module.exports = router;
