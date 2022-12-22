const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const PasswordResetSchema = new Schema({
  userId: String,
  resetString: String,
  createdAt: Date,
  expiresAt: Date,
});

PasswordResetSchema.statics.encryptUniqueString = async (uniqueString) => {
  const salt = await bcryptjs.genSaltSync(10);
  return await bcryptjs.hashSync(uniqueString, salt);
};

PasswordResetSchema.statics.compareUniqueStrings = async (
  uniqueString,
  hashString
) => {
  return await bcryptjs.compare(uniqueString, hashString);
};

const PasswordReset = model("PasswordReset", PasswordResetSchema);

module.exports = PasswordReset;
