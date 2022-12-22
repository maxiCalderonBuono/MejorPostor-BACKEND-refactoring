const nodemailer = require("nodemailer");
const User = require("../models/User");
const UserVerification = require("../models/UserVerification");

async function sendEmailVerification({
  email,
  uniqueString,
  _id,
  subject,
  body,
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });
    const emailOptions = {
      from: "<no-reply>MejorPostor",
      to: email,
      subject: subject,
      html: body,
    };

    const hashString = await UserVerification.encryptUniqueString(uniqueString);

    const newUserVerification = new UserVerification({
      userId: _id,
      uniqueString: hashString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 172800000, //172800000,
    });

    await newUserVerification.save();

    const { messageId } = await transporter.sendMail(emailOptions);
    return messageId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmailVerification };
