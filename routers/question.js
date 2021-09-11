const express = require("express");
const answer = require("./answer");
const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
} = require("../controllers/question");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHeleprs");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  questionQueryMiddleware,
} = require("../middlewares/query/questionQueryMiddleware");
const Question = require("../models/Question");

const router = express.Router();

router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name profile_image",
    },
  }),
  getAllQuestions
);
router.get("/:id", checkQuestionExist, getSingleQuestion);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get(
  "/:id/undolike",
  [getAccessToRoute, checkQuestionExist],
  undoLikeQuestion
);

// api/1618149871/answer
router.use("/:question_id/answer", checkQuestionExist, answer);

module.exports = router;
