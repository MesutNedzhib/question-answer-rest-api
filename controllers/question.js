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
  const questions = await Question.find();
  res.status(200).json({
    success: true,
    data: questions,
  });
});

const getSingleQuestion = expressAsyncHandler(async (req, res, next) => {
  const question = req.data;

  res.status(200).json({
    success: true,
    data: question,
  });
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

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
};
