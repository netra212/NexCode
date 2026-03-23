const express = require("express");
const { register, login, logout } = require("../Controllers/userAuthenticate");
const userMiddleware = require("../middleware/userMiddleware");

const authRouter = express.Router();

// Register.
authRouter.post("/register", register);

// Login.
authRouter.post("/login", login);

// Logout.
authRouter.post("/logout", userMiddleware, logout);

// getProfile.
// authRouter.get("/getProfile", getProfile);

module.exports = authRouter;
