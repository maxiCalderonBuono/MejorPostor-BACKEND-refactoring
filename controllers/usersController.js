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
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getUserById = async function (req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400), json("Employee ID required");
    }
    const user = await User.findById(userId);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updateUserById = async function (req, res) {
  try {
    const { userId } = req.params;

    const obj = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, obj, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ ok: false, message: "No user found in our data base" });
    }

    res.status(200).json({ updatedUser: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.deleteUserById = async function (req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400), json("Employee ID required");
    }

    const user = await User.findOne({ _id: userId }).exec();

    if (!user) {
      return res
        .status(404)
        .json({ ok: false, message: "No user found in our data base" });
    }
    const deletedUser = await User.deleteOne({ _id: userId });

    res.status(200).json({ deletedUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
