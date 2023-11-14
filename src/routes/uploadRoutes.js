const express = require('express');
const uploadController = require('../controllers/Upload');

const router = express.Router();

// Define a route for handling file uploads
router.post('/upload', uploadController.uploadImage);

module.exports = router;
