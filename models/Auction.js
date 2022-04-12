const { Schema, model } = require("mongoose");

const auctionSchema = new Schema({
  duration: {
    types: Number,
    required: true,
  },
  highest_bid: {
    type: Number,
    required: false,
  },
  finalize: {
    type: Boolean,
    default: false,
  },
  product: [
    {
      ref: "Product",
      type: Schema.ObjectId, //Relación entre el schema Auction y Product
    },
  ],
});

module.exports = model("Auction", auctionSchema);
