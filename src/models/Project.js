const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: String,
  startDate: String,
  endDate: String,
  description: String,
  projectImages: Array,
  type: String,
  createdFor: String,
  status: String,
  progress: String,
  employees: Array,

});

module.exports = mongoose.model('Project', projectSchema);
