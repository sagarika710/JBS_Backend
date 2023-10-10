const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  dob: String,
  address: String,
  profileImage: String,
  phoneNumber: String,
  designation: String,
  password: String,
  userType: String,
  userStatus: String,
  otpCode: String,
  otpExpiration: Date,
});

module.exports = mongoose.model('User', userSchema);
