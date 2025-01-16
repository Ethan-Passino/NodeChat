import React from 'react';

const ChatHeader = ({ username, handleLogout }) => {
    return (
        <div className="bg-gradient-to-r from-red-800 to-red-900 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">NodeChat</h1>
            <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {username}</span>
                <a 
                    href="/" 
                    className="bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-md transition-transform transform hover:scale-105"
                >
                    Home
                </a>
                <a 
                    href="/update-profile" 
                    className="bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-md transition-transform transform hover:scale-105"
                >
                    Update Profile
                </a>
                <button
                    onClick={handleLogout}
                    className="bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-md transition-transform transform hover:scale-105"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
