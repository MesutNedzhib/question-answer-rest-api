const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Question Home Page");
});

router.get("/delete", (req, res) => {
  res.status(200).send("Question Delete Page");
});

module.exports = router;
