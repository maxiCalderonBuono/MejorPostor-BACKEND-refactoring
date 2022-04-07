const { Schema, model } = require("mongoose");

const photoSchema = new Schema({
  imgTitle: String,
  imgDescription: String,
  imgPath: String,
});

module.exports = model("Photo", photoSchema);
