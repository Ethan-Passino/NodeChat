const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:userId', userController.getUser);

module.exports = router;
