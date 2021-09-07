const express = require("express");
const { register, getUser, login,logout } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.get("/profile", getAccessToRoute, getUser);
router.get("/logout",getAccessToRoute,logout)

module.exports = router;
