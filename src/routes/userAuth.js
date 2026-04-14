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

// delete.
authRouter.delete("/deleteProfile", userMiddleware, deleteProfile);

authRouter.get("/check", userMiddleware, (req, res) => {
  const reply = {
    firstName: req.result.firstName,
    emailId: req.result.emailId,
    _id: req.result._id,
  };

  res.status(200).json({
    user: reply,
    message: "Valid User",
  });
});

// getProfile.
// authRouter.get("/getProfile", getProfile);

module.exports = authRouter;
