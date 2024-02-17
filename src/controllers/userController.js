const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Return user data (excluding sensitive information like password and OTP)
      const userData = {
        fullName: user.fullName,
        email: user.email,
        dob: user.dob,
        address: user.address,
        profileImage: user.profileImage,
        phoneNumber: user.phoneNumber,
        designation: user.designation,
        userType: user.userType,
        userStatus: user.userStatus,
      };
  
      return res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  exports.getAllUsers = async (req, res) => {
    try {
      // Find all users
      const users = await User.find();
  
      // Return user data (excluding sensitive information like password and OTP)
      const usersData = users.map(user => ({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        dob: user.dob,
        address: user.address,
        profileImage: user.profileImage,
        phoneNumber: user.phoneNumber,
        designation: user.designation,
        userType: user.userType,
        userStatus: user.userStatus,
      }));
  
      return res.status(200).json(usersData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };

  exports.updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.userId; // Assuming you store user ID in the JWT
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      // Update user data based on request body
      user.fullName = req.body.fullName || user.fullName;
      user.email = req.body.email || user.email;
      user.dob = req.body.dob || user.dob;
      user.address = req.body.address || user.address;
      user.profileImage = req.body.profileImage || user.profileImage;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.designation = req.body.designation || user.designation;
      user.userType = req.body.userType || user.userType;
      user.userStatus = req.body.userStatus || user.userStatus;
  
      await user.save();
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
  
