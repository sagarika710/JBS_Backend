const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/", taskController.createTask);

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get tasks by user ID
router.get("/user/:id", taskController.getTasksByUserId);

// Get a specific task by ID
router.get("/:id", taskController.getTaskById);

// Update a specific task by ID
router.put("/:id", taskController.updateTask);

// Delete a specific task by ID
router.delete("/:id", taskController.deleteTask);


module.exports = router;
