const express = require("express");
const problemRouter = express.Router();

// Create: creating a problem., admin access need.
problemRouter.post("/create", problemCreate);

// Update: admin access need.
problemRouter.patch("/:id", problemUpdate);

// Delete: admin access need.
problemRouter.delete("/:id", problemDelete);

// Fetch: fetching all problem.,
problemRouter.get("/:id", problemFetch);
problemRouter.get("/", problemFetchAll);

// problem solved.
problemRouter.get("/user", problemSolved);
