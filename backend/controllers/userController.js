const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { newUsername, currentPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verify the current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }

        // Update the username if provided
        if (newUsername) {
            const usernameExists = await User.findOne({ username: newUsername });
            if (usernameExists) {
                return res.status(400).json({ message: 'Username is already taken.' });
            }
            user.username = newUsername;
        }

        // Update the password if provided
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// User Signup
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully.', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email or username
        let user = await User.findOne({ email }); // First, try finding by email
        if (!user) {
            user = await User.findOne({ username: email }); // Then, try finding by username
            if (!user) {
                return res.status(400).json({ message: 'Invalid email/username or password.' });
            }
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email/username or password.' });
        }

        // Generate a token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            'your_secret_key',
            { expiresIn: '1h' } // Token validity duration
        );

        res.status(200).json({ message: 'Login successful.', token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


// Get User Info
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
