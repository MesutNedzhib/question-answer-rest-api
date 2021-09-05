const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
