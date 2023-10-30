const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  status: String,
  projectid: String,
  userid: String,
  address: String,
  phone: String,
  Comment:String,
  username: String,
  day:String,
  date: { type: String, required: true },
  time: { type: String, required: true },
});
module.exports = mongoose.model("task", taskSchema);
