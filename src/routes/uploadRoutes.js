const express = require("express");
const uploadController = require("../controllers/Upload");
const upload = require("../controllers/Upload").upload;

const router = express.Router();

// Define a route for handling file uploads
router.post("/upload", upload.single("image"), uploadController.uploadImage);

module.exports = router;
