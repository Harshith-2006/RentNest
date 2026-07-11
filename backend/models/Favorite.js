const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Favorite", favoriteSchema);