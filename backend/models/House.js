const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  rent: {
    type: Number,
    required: true
  },

  houseType: {
    type: String
  },

  furnished: {
    type: Boolean,
    default: false
  },

  image: {
    type: String
  },

  status: {
    type: String,
    enum: ["available", "pending", "booked"],
    default: "available"
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("House", houseSchema);