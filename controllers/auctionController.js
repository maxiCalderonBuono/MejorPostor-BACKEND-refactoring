const Auction = require("../models/Auction");
const Product= requiere("../models/Product")

exports.createAuction = async (req, res) => {
  console.log(1)
  try {
    const { duration, highestBid } = req.body;
    console.log("highestBid", highestBid, "duration", duration)
    const auction = new Auction({ duration, highestBid });
    await auction.save();
    res.status(201).json({ message: "Auction created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating auction" });
  }
};

exports.getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.aggregate([
      //Obtención de modelos relacionados
      {
        $lookup: {
          from: "product",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);
    res.status(200).json({ auctions });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getAuctionById = async (req, res) => {
  try {
    const id = req.parms.auctionId;
    const auction = await Auction.findById(id);
    res.status(200).json({ auction: auction });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updateAuctionById = async (req, res) => {
  try {
    const id = req.params.auctionId;
    const obj = req.body;
    const updateAuction = await Auction.findByAndUpdate(id, obj, { new: true });
    res.status(200).json({ updateAuction: updateAuction });
  } catch {
    res.status(400).json({ error: error });
  }
};

exports.deleteAuctionById = async (req, res) => {
  try {
    const id = req.params.auctionId;
    await Auction.updateOne({ _id: id }, { $set: { deleted: true } });
    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
