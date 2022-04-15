const express = require("express");
const { preferences, view } = require("../controllers/paymentController.js");
const router = express.Router();

router.get("/", view);
router.post("/", preferences);

module.exports = router;
