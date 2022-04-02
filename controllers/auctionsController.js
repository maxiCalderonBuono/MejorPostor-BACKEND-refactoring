const Auction = require("../models Auction");

exports.getAuctions = async(req, res) => {
    try{
       const auctions = await Auction.aggregate([ //Obtención de modelos relacionados
           {
               $lookup: {   
                   from: "category",
                   localField: "category",
                   foreignField: "_id",
                   as: "roles"
               },
               $lookup: {
                   from: "product",
                   localField: "product",
                   foreignField: "_id",
                   as: "product"
               }
           }
       ]);
       res.status(200).json({ auctions })
    }catch(error){
        res.status(400).json({error: error});
    }
};

exports.getAuctionById = async(req, res) => {
    try{
        const id = req.parms.auctionId;
        const auction = await Auction.findById(id);
        res.status(200).json({auction: auction});
    }catch(error){
        res.status(400).json({error: error});
    }
};

exports.updateAuctionById = async(req, res) => {
    try{
        const id: req.params.auctionId;
        const obj = req.body;
        const updateAuction = await Auction.findByAndUpdate(id,obj, {new: true});
        res.status(200).json({ updateAuction: updateauction });
    }catch{
        res.status(400).json({error: error})
    }
};

exports.deleteAuctionById = async (req, res) => {
  try {
    const id = req.params.auctionId;
    await Auction.updateOne({ _id: id }, { $set: { deleted: true } });
    res.status(200).json({ message:  Auction deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
