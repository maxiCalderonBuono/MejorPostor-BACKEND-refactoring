const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync("./keys/public.pem");
const User = require("../models/User");
const Role = require("../models/Role");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, publicKey);

    req.username = decoded.username;
    req.userId = decoded.id;

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.isModerator = async function (req, res, next) {
  const user = await User.findById(req.userId);

  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator" || roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require moderator role" });
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);

  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require admin role" });
};

module.exports = { verifyToken };
