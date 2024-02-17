const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: "Unable to create task" });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch tasks" });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch task" });
  }
};

// Update a specific task by ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Unable to update task" });
  }
};

// Delete a specific task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete task" });
  }
};
exports.getTasksByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
console.log(userId)
    // Find tasks based on user ID
    const tasks = await Task.find({ userid: userId });

    // Check if tasks exist
    if (tasks.length === 0) {
      return res.status(404).json({ error: 'No tasks found for the user' });
    }

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch tasks' });
  }
};