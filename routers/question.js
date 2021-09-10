const express = require("express");
const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controllers/question");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHeleprs");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getSingleQuestion);
router.post("/ask", getAccessToRoute, askNewQuestion);

module.exports = router;
