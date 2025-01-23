import React, { useRef, useEffect } from 'react';

const ChatWindow = ({ messages }) => {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-grow p-4 bg-gradient-to-r from-red-900 to-black overflow-y-auto">
            <div className="space-y-3">
                {messages.map((msg, index) => (
                    <div key={index} className="bg-red-800 p-3 rounded-lg text-white shadow-md">
                        <p><b>{msg.username}</b>: {msg.text}</p>
                        <span className="text-sm text-gray-400">{msg.timestamp}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default ChatWindow;
