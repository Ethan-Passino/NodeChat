import io from 'socket.io-client';

const initializeSocket = (userInfo, setUsers, setMessages, selectedUser, user) => {
    const socket = io('http://localhost:2000');

    // Emit the userConnected event with the current user's username
    socket.emit('userConnected', userInfo.user.username);

    // Listen for updates to the list of online users
    socket.on('updateUsers', (onlineUsers) => {
        setUsers(onlineUsers);
    });

    // Listen for new messages
    socket.on('receiveMessage', (message) => {
        if (
            (message.sender === selectedUser?._id && message.receiver === user?._id) ||
            (message.sender === user?._id && message.receiver === selectedUser?._id)
        ) {
            setMessages((prev) => [...prev, message]);
        }
    });

    // Return the socket instance for cleanup or further use
    return socket;
};

export default initializeSocket;