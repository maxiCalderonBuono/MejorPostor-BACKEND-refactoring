const nodemailer = require("nodemailer");
const PasswordReset = require("../models/PasswordReset");

async function sendEmailRecovery({ email, resetString, _id, subject, body }) {
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

    const hashString = await PasswordReset.encryptUniqueString(resetString);

    const newPasswordReset = new PasswordReset({
      userId: _id,
      resetString: hashString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newPasswordReset.save();

    const { messageId } = await transporter.sendMail(emailOptions);
    return messageId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmailRecovery };
