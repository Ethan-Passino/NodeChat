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
        const { senderId, receiverId, text } = req.body;

        // Create the new message
        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            text,
        });

        // Fetch and populate the message
        const populatedMessage = await Message.findById(newMessage._id)
            .populate('sender', 'username')
            .populate('receiver', 'username');

        res.status(201).json(populatedMessage);
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
        })
            .populate('sender', 'username') // Fetch only the `username` field of the sender
            .populate('receiver', 'username') // Fetch only the `username` field of the receiver
            .select('text sender receiver createdAt') // Explicitly include `createdAt`
            .sort('createdAt'); // Sort by `createdAt`

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Edit a message
exports.editMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { newText } = req.body;

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { text: newText, editedAt: new Date() },
            { new: true }
        ).populate('sender', 'username') // Populate sender field again

        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found.' });
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user.userId; // Authenticated user's ID

        // Find the message and ensure the sender is the user making the request
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        if (message.sender.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own messages' });
        }

        await Message.findByIdAndDelete(messageId);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


