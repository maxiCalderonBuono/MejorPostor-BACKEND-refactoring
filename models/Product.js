const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
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
    location: {
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
    duration: {
      types: Date,
    },
    highestBid: {
      type: Number,
      required: true,
    },
    finalize: {
      type: Boolean,
      default: false,
    },
    user: [
      {
        ref: "User",
        type: Schema.Types.ObjectId, //Relación entre el schema Products y el de Users
      },
    ],
    bidUsers: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

module.exports = model("Product", productSchema);
