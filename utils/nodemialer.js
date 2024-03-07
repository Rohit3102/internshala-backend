const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = (req, res, next, url) => {
  const transport = nodemailer.createTransport({
     service: "gmail",
     host: "smtp.gmail.com",
     port: 465,
     auth: {
        user: process.env.MAIL_EMAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
     },
  });

  const mailOption = {
    from: "Rohit pvt. Ltd <rsen0537@gmail.com>",
    to: req.body.email,
    subject: "password reset link",
    // text: "Do not share this link to anyone",
    html: `<h1>Click link blow to reset password </h1>
           <a href="${url}">password reset link</a>`,
  };

  transport.sendMail(mailOption, (err, info) => {
    if(err) return next(
        new ErrorHandler(err, 500)
    );
    console.log(info);
    return res.status(200).json({
        message: "mail send successfully",
        url,
    })
  });
};