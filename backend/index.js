require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Replace with the URL of your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


// Routes
app.use('/api/users', userRoutes);

// Server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
