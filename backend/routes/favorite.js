const express = require("express");

const router = express.Router();

const Favorite = require("../models/Favorite");

const authMiddleware = require("../middleware/authMiddleware");


// ADD FAVORITE
router.post("/add/:houseId", authMiddleware, async (req, res) => {

  try {

    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      house: req.params.houseId
    });

    if (existingFavorite) {
      return res.status(400).json({
        message: "Already added to favorites"
      });
    }

    const favorite = new Favorite({
      user: req.user.id,
      house: req.params.houseId
    });

    await favorite.save();

    res.status(201).json({
      message: "Added to favorites"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// GET USER FAVORITES
router.get("/", authMiddleware, async (req, res) => {

  try {

    const favorites = await Favorite.find({
      user: req.user.id
    }).populate("house");

    res.status(200).json(favorites);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// REMOVE FAVORITE
router.delete("/remove/:id", authMiddleware, async (req, res) => {

  try {

    await Favorite.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Favorite removed"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


module.exports = router;