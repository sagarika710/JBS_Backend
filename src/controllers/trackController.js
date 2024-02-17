// trackController.js

const Location = require("../models/Track");

// Function to save user location data with automatic date and time
exports.saveLocation = async (req, res) => {
  try {
    const { userId, lat, long, status } = req.body;

    const location = new Location({
      userId,
      lat,
      long,
      date: new Date(), // Automatically set the current date
      time: new Date().toLocaleTimeString(), // Automatically set the current time
      status,
    });

    await location.save();
    res.status(201).json({ message: "Location data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to retrieve user location data for admin
exports.getUserLocation = async (req, res) => {
  try {
    const { userId, time } = req.query;

    if (userId && time) {
      const userLocation = await Location.findOne({ userId, time });
      res.json(userLocation);
    } else if (userId) {
      const allUserLocations = await Location.find({ userId });
      res.json(allUserLocations);
    } else {
      res.status(400).json({ error: "Invalid request parameters" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
