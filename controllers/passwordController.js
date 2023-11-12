const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

module.exports.getForgotPasswordView = asyncHandler((req, res) => {
  res.render("forgot-password");
});

module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });

  const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Reset Password",
    html: `<div>
            <h4>Click on the link</h4>
            <p>${link}</p>
          </div>`,
  };

  transporter.sendMail(mailOptions, function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ", success.response);
    }
  });
  res.render("link-send");
});

module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});

module.exports.resetThePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user.password = req.body.password;
    await user.save();
    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});