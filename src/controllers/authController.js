const User = require('../models/User');
const Otp = require('../models/Otp');
const { hashPassword, comparePasswords } = require('../../utils/passwordUtils');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const twilio = require('twilio');
const client = twilio(config.twilioAccountSid, config.twilioAuthToken);

exports.signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      dob,
      address,
      profileImage,
      phoneNumber,
      designation,
      password,
      userType,
    } = req.body;

    // Check if the email or phone number is already registered
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      dob,
      address,
      profileImage,
      phoneNumber,
      designation,
      password: hashedPassword,
      userType,
      userStatus: 'active', // Set to 'pending' initially
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await comparePasswords(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password.' });
      }
  
      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
      });
  
      return res.status(200).json({ token ,user});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
  exports.loginOtp = async (req, res) => {
    try {
      const { phoneNumber } = req.body;
  
      // Generate a random 6-digit OTP
    // Generate a random OTP (One-Time Password)
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  
    // Set OTP and its expiration in the user document
  
    otpExpiration = new Date(Date.now() + 600000); // OTP expires in 10 minutes

    
      // Save the OTP in the database
      const user = new Otp({ phoneNumber, otpCode, otpExpiration});
      await user.save();
  
      // Send the OTP via SMS
      await client.messages.create({
        to: phoneNumber,
        from: config.twilioPhoneNumber,
        body: `Your OTP is: ${otpCode}`,
      });
  
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  
  };

  exports.loginOtpVerify = async (req, res) => {
    try {
      const { phoneNumber, otp } = req.body;
      const otps = await Otp.findOne({ phoneNumber });
   
      // // Find the user by phoneNumber and OTP
     
     
  
      // Check if OTP is correct
      if (otps.otpCode !== otp) {
        res.status(400).json({ error: 'OTP is incorrect' });
        return;
      }
      const user = await User.findOne({ phoneNumber });
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
      });
      if (user) {
        res.status(200).json({token, user });
       
      }else{
        res.status(404).json({ error: 'User not found' });
        return;
      }
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  
  };


  exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Generate a random OTP (One-Time Password)
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  
      // Set OTP and its expiration in the user document
      user.otpCode = otpCode;
      user.otpExpiration = new Date(Date.now() + 600000); // OTP expires in 10 minutes
  
      await user.save();
  
      // Send OTP to the user via Twilio
      await client.messages.create({
        body: `Your OTP is: ${otpCode}`,
        to: user.phoneNumber,
        from: config.twilioPhoneNumber,
      });
  
      return res.status(200).json({ message: 'OTP sent successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  

  exports.resetPassword = async (req, res) => {
    try {
      const { email, otpCode, newPassword } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if the OTP is valid and not expired
      if (user.otpCode !== otpCode || user.otpExpiration < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP.' });
      }
  
      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);
  
      // Update the user's password and clear OTP
      user.password = hashedPassword;
      user.otpCode = null;
      user.otpExpiration = null;
  
      await user.save();
  
      return res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
