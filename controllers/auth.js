const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const asyncErrorHandler = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const expressAsyncHandler = require("express-async-handler");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");

const register = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(user, res);
});

const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 400));
  }

  sendJwtToClient(user, res);
});

const logout = expressAsyncHandler(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      exipres: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

const getUser = asyncErrorHandler(async (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
});

const imageUpload = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Image Upload Successfull",
    data: user,
  });
});

// Forgot password
const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const resetEmail = req.body.email;

  const user = await User.findOne({ email: resetEmail });
  if (!user) {
    return next(new CustomError("There is no user with that email", 400));
  }

  const resetPasswordToken = user.getResetPasswordTokenFromUser();

  await user.save();

  // Send to Client Generated Reset Password Data
  const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p>This <a href = '${resetPasswordUrl}' target='_blank'>link</a> will expire in 1 hour</p>
  `;

  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: resetEmail,
      subject: "Reset Your Password",
      html: emailTemplate,
    });

    return res.status(200).json({
      success: true,
      message: "Token sent your email",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new CustomError("Email Could Not Be Sent", 500));
  }
});

const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const { resetPasswordToken } = req.query;

  const { password } = req.body;

  if (!resetPasswordToken) {
    return next(new CustomError("Please provide a valid token", 400));
  }

  // mongoose greater than function = $gt
  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Invalid Token or Session Expired", 404));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Reset Password Process Success",
  });
});

module.exports = {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
};
