const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:id', authMiddleware.authenticateToken, userController.getUserById);
router.put('/update-profile', authMiddleware.authenticateToken, userController.updateUserProfile);

module.exports = router;
