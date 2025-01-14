const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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

        res.status(200).json({ message: 'Login successful.', userId: user._id });
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
