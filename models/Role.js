const { Schema, model } = require("mongoose");

exports.ROLES = {
  user: 2001,
  moderator: 1986,
  admin: 5101,
};

const roleSchema = new Schema(
  {
    name: { type: Number },
  },
  {
    versionkey: false,
  }
);

module.exports = model("Role", roleSchema);
