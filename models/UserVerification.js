const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const UserVerificationSchema = new Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

UserVerificationSchema.statics.encryptUniqueString = async (uniqueString) => {
  const salt = await bcryptjs.genSaltSync(10);
  return await bcryptjs.hashSync(uniqueString, salt);
};

UserVerificationSchema.statics.compareUniqueStrings = async (
  uniqueString,
  hashString
) => {
  return await bcryptjs.compare(uniqueString, hashString);
};

const UserVerification = model("UserVerification", UserVerificationSchema);

module.exports = UserVerification;
