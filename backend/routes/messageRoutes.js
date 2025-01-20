const express = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Save a new message (requires authentication)
router.post('/', authMiddleware, messageController.sendMessage);

// Get messages between two users (requires authentication)
router.get('/:userId/:contactId', authMiddleware, messageController.getMessagesBetweenUsers);

module.exports = router;
