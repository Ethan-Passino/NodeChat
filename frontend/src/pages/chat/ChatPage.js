import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import UserList from './components/UserList';
import HomeArea from './components/HomeArea';
import { fetchUserInfo, fetchMessages, saveMessage } from './utils/api';
import initializeSocket from './utils/socket'

const ChatPage = ({ handleLogout }) => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]); // Real-time online users
    const [isUserListVisible, setIsUserListVisible] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const socket = useRef(null);

    // Initialize WebSocket and fetch user info on mount
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

                // Initialize the socket connection
                socket.current = initializeSocket(userInfo, setUsers, setMessages, selectedUser, user);
            } catch (error) {
                console.error('Failed to initialize user or WebSocket:', error);
                handleLogout();
            }
        };

        initialize();

        // Cleanup WebSocket connection on unmount
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [handleLogout]);

    // Fetch messages for the selected user
    useEffect(() => {
        if (selectedUser && user) {
            const fetchChatMessages = async () => {
                try {
                    if(!selectedUser) {
                        return;
                    }
                    const data = await fetchMessages(user._id, selectedUser._id);
                    console.log(data);
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

            const savedMessage = await saveMessage(newMessage.senderId, newMessage.receiverId, newMessage.text, newMessage.username);

            // Emit message via WebSocket
            socket.current.emit('sendMessage', savedMessage);

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

    // Filter out your user to exclude you
    const filteredUsers = users.filter((username) => username !== user.username);

    return (
        <div className="flex h-screen">
            {/* User List Sidebar */}
            {isUserListVisible && (
                <div className="relative">
                    <UserList
                        users={filteredUsers}
                        onUserSelect={(user) => setSelectedUser(user)}
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
