const express = require("express");

const router = express.Router();

const RentalRequest = require("../models/RentalRequest");
const House = require("../models/House");

const authMiddleware = require("../middleware/authMiddleware");


// SEND RENTAL REQUEST
router.post("/add/:houseId", authMiddleware, async (req, res) => {

  try {

    const house = await House.findById(req.params.houseId);

    if (!house) {
      return res.status(404).json({
        message: "House not found"
      });
    }

    const existingRequest = await RentalRequest.findOne({
      user: req.user.id,
      house: req.params.houseId
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent"
      });
    }

    const request = new RentalRequest({
      user: req.user.id,
      house: req.params.houseId,
      owner: house.owner
    });

    await request.save();

    res.status(201).json({
      message: "Rental request sent"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// OWNER VIEW REQUESTS
router.get("/owner", authMiddleware, async (req, res) => {

  try {

    const requests = await RentalRequest.find({
      owner: req.user.id
    })
    .populate("user", "name email")
    .populate("house");

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});
// USER VIEW MY REQUESTS
router.get("/my", authMiddleware, async (req, res) => {

  try {

    const requests = await RentalRequest.find({
      user: req.user.id
    })
    .populate("house")
    .populate("owner", "name email");

    res.status(200).json(requests);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

// ACCEPT REQUEST
router.put("/accept/:id", authMiddleware, async (req, res) => {

  try {

    const request = await RentalRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    request.status = "accepted";

    await request.save();

    // Update house status
    await House.findByIdAndUpdate(
      request.house,
      {
        status: "booked"
      }
    );

    res.status(200).json({
      message: "Request accepted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// REJECT REQUEST
router.put("/reject/:id", authMiddleware, async (req, res) => {

  try {

    const request = await RentalRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    request.status = "rejected";

    await request.save();

    res.status(200).json({
      message: "Request rejected"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


module.exports = router;