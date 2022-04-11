const User = require("../models/User");
const { createPhoto } = require("../services/photoHandler");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roles",
          foreignField: "_id",
          as: "roles",
        },
      },
    ]);
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    const obj = req.body;

    //carga de foto

    const { imgTitle, imgDescription } = req.body;
    const { path } = req.file;
    const backPath = `process.env.URL_SERVER: process.env.PORT_SERVER/${path}`;
    const photo = await createPhoto({ imgTitle, imgDescription, backPath });

    obj.img = photo._id;

    //fin carga de foto

    const updatedUser = await User.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json({ updatedUser: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    await User.updateOne({ _id: id }, { $set: { deleted: true } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
