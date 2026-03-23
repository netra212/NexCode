const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

const userMiddleware = async (req, res, next) => {
  try {
    // First fetch the token from cookies.
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Tokens is not present.");
    }
    const payload = await jwt.verify(token, process.env.JWT_KEY);

    const { _id } = payload;

    if (!_id) {
      throw new Error("Invalid token");
    }

    const result = await User.findById(_id);
    if (!result) {
      throw new Error("User does not exist.");
    }

    // Check if this is present into the blocklist of redis or not.
    const IsBlocked = await redisClient.exists(`token:${token}`);

    if (IsBlocked) {
      throw new Error("Invalid Token");
    }

    req.result = result;

    next();
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = userMiddleware;
