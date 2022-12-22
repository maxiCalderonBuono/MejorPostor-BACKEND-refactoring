const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  verify,
  verified,
  refreshToken,
  refreshEmailVerification,
  logOut,
  passwordRecovery,
  resetPassword,
  confirmNewPassword,
} = require("../controllers/authController");
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require("../middlewares/validationSignup");
const { verifyToken } = require("../middlewares/jwt-validator");

router.post("/signin", signIn);

router.post("/password/recovery", passwordRecovery);

router.post(
  "/signup",
  [checkRolesExisted, checkDuplicateUsernameOrEmail],
  signUp
);
router.get("/password/reset/:_id/:resetString", resetPassword);
router.post("/verify/refresh/:_id/:uniqueString", refreshEmailVerification);
router.post("/password/confirm", confirmNewPassword);
router.get("/verify/:_id/:uniqueString", verify);
router.get("/verified", verified);
router.get("/renew", refreshToken);
router.get("/logout", logOut);

module.exports = router;
