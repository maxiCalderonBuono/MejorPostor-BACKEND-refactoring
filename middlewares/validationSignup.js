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

exports.checkDuplicateUsernameOrEmail = async function (req, res, next) {
  const { email } = req.body;

  const userEmail = await User.findOne({ email: email });

  if (userEmail) {
    return res
      .status(400)
      .json({ message: "The mail is taken. Please use another one." });
  }

  next();
};
