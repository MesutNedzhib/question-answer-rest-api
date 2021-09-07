const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const asyncErrorHandler = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");

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

const tokenTest = asyncErrorHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: "Welcome",
  });
});

module.exports = {
  register,
  tokenTest,
};
