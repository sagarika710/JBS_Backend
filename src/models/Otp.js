const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneNumber: String,
  otpCode: String,
  otpExpiration: Date,
});

module.exports = mongoose.model('Otp', otpSchema);
