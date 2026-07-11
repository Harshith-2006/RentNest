const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const userRoutes = require("./routes/user");
const houseRoutes = require("./routes/house");
const favoriteRoutes = require("./routes/favorite");
const rentalRequestRoutes = require("./routes/rentalRequest");
const reportRoutes = require("./routes/report");
const adminRoutes = require("./routes/admin");
const ownerRoutes = require("./routes/owner");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/user", userRoutes);
app.use("/house", houseRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/request", rentalRequestRoutes);
app.use("/report", reportRoutes);
app.use("/admin", adminRoutes);
app.use("/owner", ownerRoutes);

app.get("/", (req, res) => {
  res.send("Rental Platform Running");
});

console.log("URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});