const express = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Save a new message (requires authentication)
router.post('/', authMiddleware, messageController.saveMessage);

// Get all messages (requires authentication)
router.get('/', authMiddleware, messageController.getAllMessages);

// Get messages by username (requires authentication)
router.get('/:username', authMiddleware, messageController.getMessagesByUsername);

module.exports = router;
