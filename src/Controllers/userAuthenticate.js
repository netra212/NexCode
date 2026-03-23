const redisClient = require("../config/redis");
const User = require("../models/user");
const validate = require("../utils/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log(req.body);
    // validate the data;
    validate(req.body);

    // Fetching required data only.
    const { firstName, emailId, password } = req.body;

    // Hashing the password.
    req.body.password = await bcrypt.hash(password, 10);

    // Check if email is already exist.
    const user = await User.create(req.body);

    // Generating a token
    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.JWT_KEY,
      {
        expiresIn: 60 * 60,
      },
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Registered Successfully.");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

const login = async (req, res) => {
  // emailId, Password.
  try {
    const { emailId, password } = req.body;

    if (!emailId) {
      throw new Error("Invalid Credentials");
    }

    if (!password) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ emailId });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.JWT_KEY,
      {
        expiresIn: 60 * 60,
      },
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).send("Logged In Successfully.");
  } catch (err) {
    res.status(401).send("Error: " + err);
  }
};

const logout = async (req, res) => {
  // Need to Invalid cookie while implementing Logout features.
  try {
    // Validate the token via middleware.
    const { token } = req.cookies;
    // Now, Add token to the blocklis of redis.
    const payload = jwt.decode(token);

    await redisClient.set(`token: ${token}`, "Blocked");
    await redisClient.expireAt(`token: ${token}`, payload.exp);

    res.cookies("token", null, { expiresIn: new Date(Date.now()) });
    res.send("Logout successfully.");
  } catch (err) {
    res.status(503).send("Error: " + err.message);
  }
};

module.exports = { register, login, logout };
