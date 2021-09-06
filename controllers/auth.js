const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const asyncErrorHandler = require("express-async-handler");

const register = asyncErrorHandler(async (req, res, next) => {
  const name = "Caner Kus";
  const email = "caner@gmail.com";
  const password = "12345";

  const user = await User.create({
    name,
    email,
    password,
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
