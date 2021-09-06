const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");

const register = async (req, res, next) => {
  const name = "Caner Kus";
  const email = "caner@gmail.com";
  const password = "12345";

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};

const errorTest = (req, res, next) => {
  // Some code

  // Question Does Not Exists
  return next(new TypeError());
  // Some code
};

module.exports = {
  register,
  errorTest,
};
