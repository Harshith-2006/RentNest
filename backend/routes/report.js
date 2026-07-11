const express = require("express");

const router = express.Router();

const Report = require("../models/Report");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// CREATE REPORT
router.post("/add/:houseId", authMiddleware, async (req, res) => {

  try {

    const { reason } = req.body;

    const report = new Report({
      user: req.user.id,
      house: req.params.houseId,
      reason
    });

    await report.save();

    res.status(201).json({
      message: "Report submitted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// ADMIN VIEW REPORTS
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("admin"),

  async (req, res) => {

    try {

      const reports = await Report.find()
        .populate("user", "name email")
        .populate("house");

      res.status(200).json(reports);

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


module.exports = router;