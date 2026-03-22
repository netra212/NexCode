const express = require("express");

const authRouter = express.Router();

// Register.
authRouter.post("/register", register);

// Login.
authRouter.post("login", login);

// Logout.
authRouter.post("logout", logout);

// getProfile.
authRouter.get("getProfile", getProfile);
