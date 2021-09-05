const User = require("../models/User");

const register = async (req, res, next) => {
  const name = "Caner Kus";
  const email = "caner@gmail.com";
  const password = "123456";

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};

module.exports = {
  register,
};
