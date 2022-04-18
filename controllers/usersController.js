const User = require("../models/User");

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
    const {userId} = req.params;
    const user = await User.findById(userId);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const {userId} = req.params;
    const obj = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, obj, { new: true });
    res.status(200).json({ updatedUser: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const {userId} = req.params;
    await User.updateOne({ _id: userId }, { $set: { deleted: true } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
