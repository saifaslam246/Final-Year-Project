const mailer = require("nodemailer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const saif = "saifaslam1555@gmail.com";
exports.email = catchAsyncErrors(async (req, res) => {
  const { myemail } = req.body;
  const transporter = mailer.createTransport({
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
    from: "Medicare051@gmail.com",
    to: myemail,
    subject: "confirm order",
    html: "<h1>We have recived your email regarding free medicines.</h1> <h3> Our team will contact you within 2 working days. Thanks</h3></br> <h5> Regards: Medicare </h5>",
  };
  await transporter.sendMail(body);
});
