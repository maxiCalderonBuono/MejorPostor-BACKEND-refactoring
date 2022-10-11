const nodemailer = require("nodemailer");
const User = require("../models/User");
const UserVerification = require("../models/UserVerification");

async function sendEmailRecovery({ email, subject, body }) {
  console.log(`subject:`, subject);
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

    const { messageId } = await transporter.sendMail(emailOptions);
    return messageId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmailRecovery };
