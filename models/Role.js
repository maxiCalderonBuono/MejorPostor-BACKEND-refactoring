const { Schema, model } = require("mongoose");

exports.ROLES = ["user", "moderator", "admin"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionkey: false,
  }
);

module.exports = model("Role", roleSchema);
