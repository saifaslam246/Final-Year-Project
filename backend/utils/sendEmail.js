const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "Medicare051@gmail.com",
      pass: "cauybvvimklabpdm",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let body = {
    from: `${process.env.SMTP_FROM_EMAIL} <${process.env.SMTP_FROM_NAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(body);
};

module.exports = sendEmail;
