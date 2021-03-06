const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");

const app = express();

// Express - Body Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});
const PORT = process.env.PORT;

// Connect MongoDB
connectDatabase();

// Routers Middleware
app.use("/api", routers);
// app.use("/api/v2", routers); example

// Error Handler
app.use(customErrorHandler);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Welcome to Question - Answer REST API - created by: Mesut Nedzhib");
});

app.listen(PORT, () => {
  console.log(`App started on PORT: ${PORT} -> http://localhost:${PORT}`);
});
