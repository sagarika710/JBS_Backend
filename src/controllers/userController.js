const User = require('../models/User');

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
  
      return res.status(200).json({ message: 'User profile updated successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
