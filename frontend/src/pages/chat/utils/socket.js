import io from 'socket.io-client';

const initializeSocket = (userInfo, setUsers, setMessages, selectedUser, user) => {
    const socket = io('http://localhost:2000');

    // Emit the userConnected event with the current user's ID and username
    socket.emit('userConnected', { _id: userInfo.user._id, username: userInfo.user.username });

    // Listen for updates to the list of online users
    socket.on('updateUsers', (onlineUsers) => {
        // onlineUsers will now be an array of objects: [{ _id, username }]
        setUsers(onlineUsers);
    });

    // Listen for new messages
    socket.on('receiveMessage', (message) => {
        if (
            (message.sender._id === selectedUser?._id && message.receiver._id === user?._id) ||
            (message.sender._id === user?._id && message.receiver._id === selectedUser?._id)
        ) {
            setMessages((prev) => [...prev, message]);
        }
    });

    // Return the socket instance for cleanup or further use
    return socket;
};

export default initializeSocket;
