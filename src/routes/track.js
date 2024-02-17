const express = require("express");
const router = express.Router();
const track = require("../controllers/trackController");

router.post("/location", track.saveLocation);
router.get("/location", track.getUserLocation);

module.exports = router;
