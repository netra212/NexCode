const express = require("express");
const {
  register,
  login,
  logout,
  adminRegister,
} = require("../Controllers/userAuthenticate");
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const authRouter = express.Router();

// Register.
authRouter.post("/register", register);

// Login.
authRouter.post("/login", login);
authRouter.post("/admin/register/", adminMiddleware, adminRegister);

// Logout.
authRouter.post("/logout", userMiddleware, logout);

// getProfile.
// authRouter.get("/getProfile", getProfile);

module.exports = authRouter;
