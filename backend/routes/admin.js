const express = require("express");
const router = express.Router();

const User = require("../models/User");
const House = require("../models/House");
const Report = require("../models/Report");
const RentalRequest = require("../models/RentalRequest");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// =====================
// ADMIN DASHBOARD
// =====================
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {

      const totalUsers = await User.countDocuments({
        role: "user"
      });

      const totalOwners = await User.countDocuments({
        role: "owner"
      });

      const totalHouses = await House.countDocuments();

      const availableHouses = await House.countDocuments({
        status: "available"
      });

      const bookedHouses = await House.countDocuments({
        status: "booked"
      });

      const totalRequests = await RentalRequest.countDocuments();

      const totalReports = await Report.countDocuments();

      const recentUsers = await User.find()
        .select("name role createdAt")
        .sort({ createdAt: -1 })
        .limit(5);

      const recentHouses = await House.find()
        .select("title location rent")
        .sort({ createdAt: -1 })
        .limit(5);

      const recentRequests = await RentalRequest.find()
        .populate("user", "name")
        .populate("house", "title")
        .sort({ createdAt: -1 })
        .limit(5);

      res.json({
        stats: {
          totalUsers,
          totalOwners,
          totalHouses,
          availableHouses,
          bookedHouses,
          totalRequests,
          totalReports
        },
        recentUsers,
        recentHouses,
        recentRequests
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }
  }
);


// =====================
// ALL HOUSES
// =====================
router.get(
  "/houses",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const houses = await House.find()
        .populate("owner", "name email")
        .sort({ createdAt: -1 });

      res.json(houses);

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// =====================
// DELETE HOUSE
// =====================
router.delete(
  "/house/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const house = await House.findById(req.params.id);

      if (!house) {
        return res.status(404).json({
          message: "House not found"
        });
      }

      await House.findByIdAndDelete(req.params.id);

      res.json({
        message: "House deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// =====================
// ALL USERS
// =====================
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// =====================
// BLOCK USER
// =====================
router.put(
  "/block/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      await User.findByIdAndUpdate(
        req.params.id,
        {
          status: "blocked"
        }
      );

      res.json({
        message: "User blocked"
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// =====================
// UNBLOCK USER
// =====================
router.put(
  "/unblock/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      await User.findByIdAndUpdate(
        req.params.id,
        {
          status: "active"
        }
      );

      res.json({
        message: "User unblocked"
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// =====================
// ALL REQUESTS
// =====================
router.get(
  "/requests",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const requests = await RentalRequest.find()
        .populate("user", "name email")
        .populate("owner", "name email")
        .populate("house", "title location rent")
        .sort({ createdAt: -1 });

      res.json(requests);

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// =====================
// ALL REPORTS
// =====================
router.get(
  "/reports",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const reports = await Report.find()
        .populate("user", "name email")
        .populate("house", "title location rent image")
        .sort({ createdAt: -1 });

      res.json(reports);

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// =====================
// DELETE REPORT
// =====================
router.delete(
  "/report/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const report = await Report.findById(req.params.id);

      if (!report) {
        return res.status(404).json({
          message: "Report not found"
        });
      }

      await Report.findByIdAndDelete(req.params.id);

      res.json({
        message: "Report deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

module.exports = router;