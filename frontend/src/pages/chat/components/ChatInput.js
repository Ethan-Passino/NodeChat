import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message.trim());
            setMessage('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-red-800 p-4 flex items-center space-x-3 shadow-md"
        >
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
                type="submit"
                className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
                Send
            </button>
        </form>
    );
};

export default ChatInput;
