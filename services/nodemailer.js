const nodemailer = require("nodemailer");

async function sendEmail({ email, subject = "Registro a MejorPostor", body }) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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

module.exports = { sendEmail };
