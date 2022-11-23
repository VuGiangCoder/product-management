const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "bigcorpcompanysky@gmail.com",
    pass: "palbjaokjwidlbdc",
  },
});

const sendMail = async (reveicer, subject, html) => {
  await transporter.sendMail({
    from: "product managerment <bigcorpcompanysky@gmail.com>",
    to: reveicer,
    subject: subject,
    html: html,
  });
  console.log("đã gửi");
};

module.exports = sendMail;
