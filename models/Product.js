const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  initialPrice: {
    type: Number,
    required: true,
  },
  auctionedPrice: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  users: [
    {
      ref: "User",
      type: Schema.Types.ObjectId, //Relación entre el schema Products y el de Users
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Product", productSchema);
