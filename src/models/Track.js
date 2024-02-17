const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  userId: String,
  lat: Number,
  long: Number,
  date: Date,
  time: String,
  status: String,
});

module.exports = mongoose.model("Location", locationSchema);
