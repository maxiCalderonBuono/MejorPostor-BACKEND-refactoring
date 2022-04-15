const express = require("express");
const router = express.Router();
const {
  getAuctions,
  getAuctionById,
  createAuction,
  updateAuctionById,
  deleteAuctionById,
} = require("../controllers/auctionController");

router.get("/", getAuctions);
router.get("/:auctionId", getAuctionById);
/*router.post("/", createAuction);*/
router.put("/:auctionId", updateAuctionById);
router.delete("/:auctionId", deleteAuctionById);

module.exports = router;
