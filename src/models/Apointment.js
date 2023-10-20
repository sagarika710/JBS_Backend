const mongoose = require("mongoose");
const apoinmentSchema = new mongoose.Schema({
  home_type: String,
  category: String,
  location: String,
  date: String,
  time: String,
  name: String,
  address: String,
  phone:  String ,
  city: String,
  state: String,
  pin: String,
  user_id:String

});
module.exports = mongoose.model("apoinment", apoinmentSchema);

