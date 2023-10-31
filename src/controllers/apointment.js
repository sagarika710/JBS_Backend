const Appointment = require("../models/Apointment");
// Create a new appointment
// app.post("/api/appointments",

exports.creatAppointments = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ error: "Unable to create appointment" });
  }
};

// Get all appointments
// app.get("/api/appointments",

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch appointments" });
  }
};

// Get a specific appointment by ID
// app.get("/api/appointments/:id",

exports.getAppointmentsById = async (req, res) => {
  try {
    const appointment = await Appointment.find({user_id:req.params.id});
        console.log(appointment)
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch appointment" });
  }
};

// Update a specific appointment by ID
// app.put("/api/appointments/:id",

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Unable to update appointment" });
  }
};

// Delete a specific appointment by ID
// app.delete("/api/appointments/:id",

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndRemove(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete appointment" });
  }
};
