const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const expressAsyncHandler = require("express-async-handler");

const getSingleUser = expressAsyncHandler(async (req, res, next) => {
  const user = req.data;

  return res.status(200).json({
    success: true,
    data: user,
  });
});
const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  return res.status(200).json(res.queryResults);
});

module.exports = {
  getSingleUser,
  getAllUsers,
};
