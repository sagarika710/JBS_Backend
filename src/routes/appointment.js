const express = require("express");
const router = express.Router();
const apointment = require("../controllers/apointment");

router.post("/", apointment.creatAppointments);
router.get("/", apointment.getAllAppointments);
router.get("/:id", apointment.getAppointmentsById);
router.put("/:id", apointment.getAppointmentsById);
router.delete("/:id", apointment.getAppointmentsById);

module.exports = router;
