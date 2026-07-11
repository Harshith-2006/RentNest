const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
    required: true
  },

  reason: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);