const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const appointmentRoutes = require("./src/routes/appointment");
const userRoutes = require("./src/routes/user");
const projectRoutes = require("./src/routes/project");
const config = require("./config/config");
const taskRoutes = require("./src/routes/taskRoutes");
const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.log("Connection error");
});

mongoose.connection.on("connected", () => {
  console.log("Connection successful");
});
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/tasks", taskRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use((req, res, next) => {
  res.status(404).json({
    error: "URL not found",
  });
});
