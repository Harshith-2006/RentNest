const express = require("express");

const router = express.Router();

const House = require("../models/House");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const upload = require("../config/multer");


// ADD HOUSE
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("owner"),
  upload.single("image"),

  async (req, res) => {

    try {

      const {
        title,
        description,
        location,
        rent,
        houseType,
        furnished
      } = req.body;

const imagePath = req.file
  ? req.file.path
  : "";
      const newHouse = new House({
        title,
        description,
        location,
        rent,
        houseType,
        furnished,
        image: imagePath,
        owner: req.user.id
      });

      await newHouse.save();

      res.status(201).json({
        message: "House added successfully",
        house: newHouse
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// GET ALL HOUSES
router.get("/", async (req, res) => {

  try {

    const houses = await House.find()
      .populate("owner", "name email");

    res.status(200).json(houses);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// SEARCH & FILTER
router.get("/search/filter", async (req, res) => {

  try {

    const {
      minRent,
      maxRent,
      houseType,
      furnished
    } = req.query;

    let filter = {};

    // Rent Filter
    if (minRent || maxRent) {

      filter.rent = {};

      if (minRent) {
        filter.rent.$gte = Number(minRent);
      }

      if (maxRent) {
        filter.rent.$lte = Number(maxRent);
      }

    }

    // House Type Filter
    if (houseType) {
      filter.houseType = houseType;
    }

    // Furnished Filter
    if (furnished !== undefined) {
      filter.furnished = furnished === "true";
    }

    const houses = await House.find(filter);

    res.status(200).json(houses);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// GET SINGLE HOUSE
router.get("/:id", async (req, res) => {

  try {

    const house = await House.findById(req.params.id)
      .populate("owner", "name email");

    if (!house) {
      return res.status(404).json({
        message: "House not found"
      });
    }

    res.status(200).json(house);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// UPDATE HOUSE
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("owner"),

  async (req, res) => {

    try {

      const house = await House.findById(req.params.id);

      if (!house) {
        return res.status(404).json({
          message: "House not found"
        });
      }

      // Check ownership
      if (house.owner.toString() !== req.user.id) {
        return res.status(403).json({
          message: "Unauthorized"
        });
      }

      const updatedHouse = await House.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).json({
        message: "House updated successfully",
        house: updatedHouse
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


// DELETE HOUSE
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("owner"),

  async (req, res) => {

    try {

      const house = await House.findById(req.params.id);

      if (!house) {
        return res.status(404).json({
          message: "House not found"
        });
      }

      // Check ownership
      if (house.owner.toString() !== req.user.id) {
        return res.status(403).json({
          message: "Unauthorized"
        });
      }

      await House.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: "House deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);


module.exports = router;