const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  CreateProblem,
  UpdateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
} = require("../Controllers/userProblem");
const userMiddleware = require("../middleware/userMiddleware");
const problemRouter = express.Router();

// Create: creating a problem., admin access need.
problemRouter.post("/create", adminMiddleware, CreateProblem);

// Update: admin access need.
problemRouter.patch("/update/:id", adminMiddleware, UpdateProblem);

// Delete: admin access need.
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

// Fetch: fetching all problem.,
problemRouter.get("/problemByiD/:id", userMiddleware, getProblemById);
problemRouter.get("/getAllProblem", userMiddleware, getAllProblem);

// problem solved.
problemRouter.get(
  "/problemSolvedByUser",
  userMiddleware,
  getAllSolvedProblemByUser,
);

module.exports = problemRouter;
