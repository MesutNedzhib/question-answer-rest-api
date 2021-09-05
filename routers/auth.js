const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Auth Home Page");
});

router.get("/register", (req, res) => {
  res.status(200).send("Auth Register Page");
});

module.exports = router;
