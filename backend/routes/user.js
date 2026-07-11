const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const User = require("../models/User");

const router = express.Router();


// ==============================
// REGISTER
// ==============================
router.post("/register", async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Only allow User or Owner registration
    const allowedRole =
      role === "owner"
        ? "owner"
        : "user";

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: allowedRole
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// ==============================
// LOGIN
// ==============================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Optional: Prevent blocked users from logging in
    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Your account has been blocked by Admin."
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// ==============================
// PROFILE
// ==============================
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {

    res.json({
      message: "Protected Route Accessed",
      user: req.user
    });

  }
);


// ==============================
// OWNER DASHBOARD TEST
// ==============================
router.get(
  "/owner-dashboard",
  authMiddleware,
  roleMiddleware("owner"),
  async (req, res) => {

    res.json({
      message: "Welcome Owner Dashboard"
    });

  }
);

module.exports = router;