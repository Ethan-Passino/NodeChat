import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatHeader from './components/ChatHeader';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import UserList from './components/UserList';
import HomeArea from './components/HomeArea';
import { fetchUserInfo, fetchMessages, saveMessage, editMessage, deleteMessage } from './utils/api';
const REACT_ROOT_BACKEND = process.env.REACT_APP_BACKEND_ROOT;

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

                if (!socket.current) {
                    socket.current = io(`${REACT_ROOT_BACKEND}`);

                    socket.current.emit('userConnected', userInfo.user);

                    socket.current.on('updateUsers', (onlineUsers) => {
                        console.log("Updated Users List:", onlineUsers);
                        setUsers(onlineUsers);
                    });

                    socket.current.on('receiveMessage', async (message) => {
                        if (
                            (message.sender._id === selectedUser?._id && message.receiver._id === user._id) ||
                            (message.sender._id === user._id && message.receiver._id === selectedUser?._id)
                        ) {
                            const updatedMessages = await fetchMessages(user._id, selectedUser._id);
                            setMessages(updatedMessages);
                        }
                    });

                    socket.current.on('messageUpdated', async (updatedMessage) => {
                        setMessages((prevMessages) =>
                            prevMessages.map((msg) =>
                                msg._id === updatedMessage._id ? updatedMessage : msg
                            )
                        );
                    });

                    socket.current.on('messageDeleted', (messageId) => {
                        setMessages((prevMessages) =>
                            prevMessages.filter((msg) => msg._id !== messageId)
                        );
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
                socket.current = null;
            }
        };
    }, [handleLogout, selectedUser]);

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

            socket.current.emit('sendMessage', savedMessage);

            setMessages((prev) => [...prev, savedMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleEditMessage = async (messageId, newText) => {
        try {
            const updatedMessage = await editMessage(messageId, newText);
    
            // Ensure sender remains populated after editing
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg._id === messageId
                        ? { ...msg, text: updatedMessage.text, editedAt: updatedMessage.editedAt, sender: msg.sender }
                        : msg
                )
            );
    
            socket.current.emit('updateMessage', updatedMessage);
        } catch (error) {
            console.error('Failed to edit message:', error);
        }
    };
    

    const handleDeleteMessage = async (messageId) => {
        try {
            await deleteMessage(messageId);
            socket.current.emit('deleteMessage', messageId);
            setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

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

    const filteredUsers = users.filter((u) => u._id !== user._id);

    return (
        <div className="flex h-screen">
            {isUserListVisible && (
                <div className="relative">
                    <UserList users={filteredUsers} onUserSelect={(selectedUser) => setSelectedUser(selectedUser)} />
                    <button
                        onClick={toggleUserList}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-red-800 text-white p-2 shadow-md hover:bg-red-700"
                    >
                        &larr;
                    </button>
                </div>
            )}
            {!isUserListVisible && (
                <button onClick={toggleUserList} className="bg-red-800 text-white p-2 shadow-md hover:bg-red-700">
                    &rarr;
                </button>
            )}

            <div className="flex flex-col flex-grow">
                <ChatHeader username={user.username} handleLogout={handleLogout} />
                {selectedUser ? (
                    <>
                        <ChatWindow
                            messages={messages}
                            userId={user._id}
                            handleEditMessage={handleEditMessage}
                            handleDeleteMessage={handleDeleteMessage}
                            user={user}
                        />
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
