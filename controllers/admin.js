const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const expressAsyncHandler = require("express-async-handler");

const blockUser = expressAsyncHandler(async (req, res, next) => {
  // const {id} = req.params;
  // const user = await User.findById(id);

  // Better way
  const user = req.data;

  user.blocked = !user.blocked;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Block - Unblock Successfull",
  });
});

const deleteUser = expressAsyncHandler(async (req, res, next) => {
  // Better way
  const user = req.data;

  await user.remove();

  return res.status(200).json({
    success: true,
    message: "Delete Operation Successfull",
  });
});


module.exports = {
  blockUser,
  deleteUser,
};
