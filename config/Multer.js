const multer = require("multer");
const { v4: uuid } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const filter = (multer.fileFilter = (req, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error("File is not allowed"));
  }
  cb(null, true);
});

module.exports = multer({ storage, filter });
