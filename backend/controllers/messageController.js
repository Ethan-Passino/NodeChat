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

// Fetch messages between two users
exports.getMessages = async (req, res) => {
    const { userId, contactId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: contactId },
                { sender: contactId, receiver: userId },
            ],
        }).sort('timestamp');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Send a message to a specific user
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, text, username } = req.body;

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            text,
            username,
        });

        console.log(username);

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


exports.getMessagesBetweenUsers = async (req, res) => {
    const { userId, contactId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: contactId },
                { sender: contactId, receiver: userId },
            ],
        }).sort('timestamp');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

