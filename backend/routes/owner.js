const express = require("express");

const router = express.Router();

const House = require("../models/House");

const RentalRequest = require("../models/RentalRequest");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// OWNER DASHBOARD
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("owner"),

  async (req, res) => {

    try {

      // OWNER HOUSES
      const houses = await House.find({
        owner: req.user.id
      });

      // HOUSE IDS
      const houseIds = houses.map(
        (house) => house._id
      );

      // RENTAL REQUESTS
      const requests =
        await RentalRequest.find({
          house: { $in: houseIds }
        })
        .populate("house")
        .populate("user", "name email");

      // COUNTS
      const totalListings =
        houses.length;

      const availableHouses =
        houses.filter(
          (h) => h.status === "available"
        ).length;

      const bookedHouses =
        houses.filter(
          (h) => h.status === "booked"
        ).length;

      const pendingHouses =
        houses.filter(
          (h) => h.status === "pending"
        ).length;

      res.status(200).json({

        totalListings,

        availableHouses,

        bookedHouses,

        pendingHouses,

        houses,

        requests

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


module.exports = router;