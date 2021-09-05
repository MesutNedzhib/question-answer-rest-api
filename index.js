const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

app.listen(PORT, () => {
  console.log(`App started on PORT: ${PORT} -> http://localhost:${PORT}`);
});
