const Message = require('../models/Message');

// Save a new message
exports.saveMessage = async (req, res) => {
    try {
        const { username, text } = req.body;
        const newMessage = new Message({ username, text });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ message: 'Failed to save message.' });
    }
};

// Retrieve all messages
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Failed to fetch messages.' });
    }
};

// Retrieve messages for a specific user (optional, if needed)
exports.getMessagesByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const messages = await Message.find({ username }).sort({ timestamp: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages by username:', error);
        res.status(500).json({ message: 'Failed to fetch messages.' });
    }
};
