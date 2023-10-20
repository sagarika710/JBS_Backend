const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  checkin: String,
  user_id: String,
  type: String,
  checkin_date: String,
  checkout_date: String,
  checkin_loc: {
    lat: String,
    lang: String,
  },
  checkin_address: String,
  checkout_address: String,
  checkout: String,
  checkout_loc: {
    lat: String,
    lang: String,
  },
  total_time: String,
});
module.exports = mongoose.model("Attendance", attendanceSchema);
