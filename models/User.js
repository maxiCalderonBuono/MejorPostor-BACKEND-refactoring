const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
      trim: true,
      min: 3,
      max: 255,
    },
    password: {
      type: "string",
      trim: true,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
      min: 6,
      max: 255,
    },
    surname: {
      type: "string",
      required: true,
      trim: true,
    },
    image: {
      type: "string",
      required: true,
      trim: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId, //Relación entre el Schema de roles y el de Users
      },
    ],
    products: [
      {
        ref: "Product",
        type: Schema.Types.ObjectId,
      },
    ],
    enabled: {
      type: "boolean",
      default: false,
    },
    deleted: {
      type: "boolean",
      default: false,
    },
  },
  {
    timestamps: true,
    versionkey: false,
    strict: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSaltSync(10);
  return await bcryptjs.hashSync(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcryptjs.compare(password, receivedPassword);
};

//
userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  //saco los campos q no quiero mostrar en la response
  return user;
};
module.exports = model("User", userSchema);
