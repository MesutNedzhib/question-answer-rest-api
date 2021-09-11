const Question = require("../models/Question");
const CustomError = require("../helpers/errors/CustomError");
const expressAsyncHandler = require("express-async-handler");

const askNewQuestion = expressAsyncHandler(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    data: question,
  });
});

const getAllQuestions = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json(res.queryResults);
});

const getSingleQuestion = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json(res.queryResults);
});

const editQuestion = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  let question = await Question.findById(id);

  question.title = title;
  question.content = content;

  question = await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});

const deleteQuestion = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Question.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Question Delete Operation Successfull",
  });
});

const likeQuestion = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  // Like is exist
  if (question.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this question", 400));
  }
  question.likes.push(req.user.id);
  question.likeCount = question.likes.length;

  await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});

const undoLikeQuestion = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not udno like operation for this question", 400)
    );
  }
  const index = question.likes.indexOf(req.user.id);
  question.likes.splice(index, 1);
  question.likeCount = question.likes.length;

  await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
};
