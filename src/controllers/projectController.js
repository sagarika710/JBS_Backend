const Project = require('../models/Project')

exports.createProject = async (req, res) => {
  try {
    const {
      projectName,
      startDate,
      endDate,
      description,
      projectImages,
      type,
      createdFor,
      status,
      progress,
      employees,
    } = req.body;
    const newProject = new Project({
      projectName,
      startDate,
      endDate,
      description,
      projectImages,
      type,
      createdFor,
      status,
      progress,
      employees,
    });
    await newProject.save();

    return res.status(201).json({ message: 'Project Created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Project Created failed' });
  }
}
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Invalid Project id' });
    }

    project.projectName = req.body.projectName || project.projectName,
      project.startDate = req.body.startDate || project.startDate,
      project.endDate = req.body.endDate || project.endDate,
      project.description = req.body.description || project.description,
      project.projectImages = req.body.projectImages || project.projectImages,
      project.type = req.body.type || project.type,
      project.createdFor = req.body.createdFor || project.createdFor,
      project.status = req.body.status || project.status,
      project.progress = req.body.progress || project.progress,
      project.employees = req.body.employees || project.employees,


      project.save();

    return res.status(200).json({ message: 'Project updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Invalid Project id' });
    }
    const projectData = {
      projectName: project.projectName,
      startDate: project.startDate,
      endDate: project.endDate,
      description: project.description,
      projectImages: project.projectImages,
      type: project.type,
      createdFor: project.createdFor,
      status: project.status,
      progress: project.progress,
      employees: project.employees,
    };

    return res.status(200).json(projectData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getProjectByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

const project = await Project.find({ createdFor: userId });
  
  

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getAllProject = async (req, res) => {
  try {


const project = await Project.find();
   if (!project) {
      return res.status(404).json({ message: 'Invalid Project id' });
    }
   

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};