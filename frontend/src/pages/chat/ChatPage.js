import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatHeader from './components/ChatHeader';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import UserList from './components/UserList';
import HomeArea from './components/HomeArea';
import { fetchUserInfo, fetchMessages, saveMessage } from './utils/api';

const ChatPage = ({ handleLogout }) => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]); // Online users
    const [isUserListVisible, setIsUserListVisible] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const socket = useRef(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            handleLogout();
            return;
        }

        const initialize = async () => {
            try {
                const userInfo = await fetchUserInfo(userId);
                setUser(userInfo.user);

                // ✅ Prevent multiple socket connections
                if (!socket.current) {
                    socket.current = io('http://localhost:2000');

                    // ✅ Emit user connection event
                    socket.current.emit('userConnected', userInfo.user);

                    // ✅ Listen for online users update
                    socket.current.on('updateUsers', (onlineUsers) => {
                        console.log("Updated Users List:", onlineUsers);
                        setUsers(onlineUsers);
                    });

                    // ✅ Listen for new messages and update UI
                    socket.current.on('receiveMessage', async (message) => {
                        if (
                            (message.sender._id === selectedUser?._id && message.receiver._id === user._id) ||
                            (message.sender._id === user._id && message.receiver._id === selectedUser?._id)
                        ) {
                            // ✅ Fetch updated messages from backend when new message is received
                            const updatedMessages = await fetchMessages(user._id, selectedUser._id);
                            setMessages(updatedMessages);
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to initialize user or WebSocket:', error);
                handleLogout();
            }
        };

        initialize();

        return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null; // ✅ Ensure socket is properly cleaned up
            }
        };
    }, [handleLogout, selectedUser]);

    // Fetch messages for the selected user
    useEffect(() => {
        if (selectedUser && user) {
            const fetchChatMessages = async () => {
                try {
                    const data = await fetchMessages(user._id, selectedUser._id);
                    setMessages(data);
                } catch (error) {
                    console.error('Failed to load messages:', error);
                }
            };
            fetchChatMessages();
        }
    }, [selectedUser, user]);

    // Handle sending messages
    const handleSend = async (text) => {
        try {
            const newMessage = {
                senderId: user._id,
                receiverId: selectedUser._id,
                text,
                username: user.username,
            };

            const savedMessage = await saveMessage(
                newMessage.senderId, 
                newMessage.receiverId, 
                newMessage.text, 
                newMessage.username
            );

            // ✅ Emit message via WebSocket
            socket.current.emit('sendMessage', savedMessage);

            // ✅ Append message to local UI immediately
            setMessages((prev) => [...prev, savedMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    // Toggle visibility of the user list
    const toggleUserList = () => {
        setIsUserListVisible((prev) => !prev);
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-900 to-black text-white">
                <p>Loading...</p>
            </div>
        );
    }

    // ✅ Only filter out the current user from the online list, NOT the selected user
    const filteredUsers = users.filter((u) => u._id !== user._id);

    return (
        <div className="flex h-screen">
            {/* User List Sidebar */}
            {isUserListVisible && (
                <div className="relative">
                    <UserList
                        users={filteredUsers}
                        onUserSelect={(selectedUser) => setSelectedUser(selectedUser)}
                    />
                    <button
                        onClick={toggleUserList}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-red-800 text-white p-2 shadow-md hover:bg-red-700"
                    >
                        &larr;
                    </button>
                </div>
            )}
            {!isUserListVisible && (
                <button
                    onClick={toggleUserList}
                    className="bg-red-800 text-white p-2 shadow-md hover:bg-red-700"
                >
                    &rarr;
                </button>
            )}

            {/* Chat Area */}
            <div className="flex flex-col flex-grow">
                <ChatHeader username={user.username} handleLogout={handleLogout} />
                {selectedUser ? (
                    <>
                        <ChatWindow messages={messages} />
                        <ChatInput onSend={handleSend} />
                    </>
                ) : (
                    <HomeArea />
                )}
            </div>
        </div>
    );
};

export default ChatPage;
