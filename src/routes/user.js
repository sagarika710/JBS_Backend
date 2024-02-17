const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const  attendance  = require('../controllers/attendance');


router.get('/alluser',userController.getAllUsers);
router.get('/:id',  userController.getUserById);
router.put('/update-profile', authMiddleware.authenticateToken, userController.updateUserProfile);
router.get('/att/:user_id',attendance.getattndace);
router.post('/attendance',attendance.attendance);
module.exports = router;
