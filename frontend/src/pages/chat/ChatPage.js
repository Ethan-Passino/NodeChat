import React, { useState, useEffect } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import UserList from './components/UserList';
import HomeArea from './components/HomeArea';
import { fetchUserInfo, fetchMessages, saveMessage } from './utils/api';

const ChatPage = ({ handleLogout }) => {
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState(['User1', 'User2', 'User3']);
    const [isUserListVisible, setIsUserListVisible] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            handleLogout();
            return;
        }

        const getUserInfo = async () => {
            try {
                const userInfo = await fetchUserInfo(userId);
                setUser(userInfo.user);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                handleLogout();
            }
        };

        getUserInfo();
    }, [handleLogout]);

    useEffect(() => {
        if (selectedUser) {
            const fetchChatMessages = async () => {
                try {
                    const data = await fetchMessages(); // Modify this to filter messages by `selectedUser` if needed
                    setMessages(data);
                } catch (error) {
                    console.error('Failed to load messages:', error);
                    handleLogout();
                }
            };

            fetchChatMessages();
        }
    }, [handleLogout, selectedUser]);

    const handleSend = async (text) => {
        const newMessage = {
            username: user?.username || 'Anonymous',
            text,
            timestamp: new Date().toISOString(),
        };

        try {
            const savedMessage = await saveMessage(newMessage);
            setMessages((prev) => [...prev, savedMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);
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

    return (
        <div className="flex h-screen">
            {isUserListVisible && (
                <div className="relative">
                    <UserList users={users} onUserSelect={setSelectedUser} />
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