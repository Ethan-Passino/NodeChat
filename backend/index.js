require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const http = require('http');
const { Server } = require('socket.io');

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
app.use('/api/messages', messageRoutes);

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
   },
});

// In Memory store for online users
const onlineUsers = new Map();

// WebSocket connection logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining
    socket.on('userConnected', (username) => {
        onlineUsers.set(socket.id, username);
        io.emit('updateUsers', Array.from(onlineUsers.values()));
    });

    // Handle message sending
    socket.on('sendMessage', (message) => {
        console.log("Message received:", message);
        io.emit('receiveMessage', message); // Broadcast to all clients
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        onlineUsers.delete(socket.id);
        io.emit('updateUsers', Array.from(onlineUsers.values())); // Broadcast updated users list to all clients
    });
});

//Start Server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
