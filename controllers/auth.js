const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const asyncErrorHandler = require("express-async-handler");

const register = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

const errorTest = asyncErrorHandler((req, res, next) => {
  // Some code

  // Question Does Not Exists
  return next(new TypeError("TypeError"));
  // Some code
});

module.exports = {
  register,
  errorTest,
};
