const { ROLES } = require("../models/Role");
const User = require("../models/User");

exports.checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(400)
          .json({ message: `Role ${req.body.roles[i]} does not exist` });
      }
    }
  }
  next();
};

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;

  const userUsername = await User.findOne({ username: username });

  if (userUsername)
    return res.status(400).json({ message: "The Username already exist" });

  const userEmail = await User.findOne({ email: email });

  if (userEmail)
    return res.status(400).json({ message: "The Email already exist" });

  next();
};
