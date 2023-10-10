const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/creatProject',  projectController.createProject);
router.put('/updateProject/:id' , projectController.updateProject)
router.get('/projectById/:id' , projectController.getProjectById)
router.get('/projectByUserId/:id' , projectController.getProjectByUserId)
router.get('/allProject' , projectController.getAllProject)
module.exports = router;
