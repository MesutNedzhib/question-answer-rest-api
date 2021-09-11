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
  let query = Question.find();
  const populate = true;
  const populateObject = {
    path: "user",
    select: "name profile_image",
  };

  // Search
  if (req.query.search) {
    const searchObject = {};
    // Example Title
    // searchValue

    const regex = new RegExp(req.query.search, "i");
    searchObject["title"] = regex;

    query = query.where(searchObject);
  }

  // Populate
  if (populate) {
    query = query.populate(populateObject);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const pagination = {};
  const total = await Question.countDocuments();

  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  query = query.skip(startIndex).limit(limit);

  // 1 2 3 4 5 6 7 8 9 10 - Questions
  // page = 2, limit 5 - startIndex 2, endIndex 10
  // skip(2)
  // limit(2)

  const questions = await query;
  // const questions = await Question.find().where({title:"Questions 3 - Title"});

  res.status(200).json({
    success: true,
    count: questions.length,
    pagination: pagination,
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

const likeQuestion = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  // Like is exist
  if (question.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this question", 400));
  }
  question.likes.push(req.user.id);

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
