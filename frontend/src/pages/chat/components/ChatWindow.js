import React, { useRef, useEffect, useState } from 'react';

const ChatWindow = ({ messages, handleDeleteMessage, handleEditMessage, user }) => {    
    const messagesEndRef = useRef(null);
    const [selectedMessage, setSelectedMessage] = useState(null); // Message selected for deletion
    const [showConfirmation, setShowConfirmation] = useState(false); // Modal visibility
    const [editingMessage, setEditingMessage] = useState(null); // Message being edited
    const [editedText, setEditedText] = useState(""); // Input text for editing

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Format timestamp
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    // Show confirmation modal before deleting
    const confirmDelete = (message) => {
        setSelectedMessage(message);
        setShowConfirmation(true);
    };

    // Handle confirmed deletion
    const deleteMessage = () => {
        if (selectedMessage) {
            handleDeleteMessage(selectedMessage._id);
        }
        setShowConfirmation(false);
        setSelectedMessage(null);
    };

    // Handle edit button click
    const startEditing = (message) => {
        setEditingMessage(message._id);
        setEditedText(message.text);
    };

    // Save edited message
    const saveEditedMessage = () => {
        if (editingMessage && editedText.trim() !== "") {
            handleEditMessage(editingMessage, editedText);
        }
        setEditingMessage(null);
        setEditedText("");
    };

    return (
        <div className="flex-grow p-4 bg-gradient-to-r from-red-900 to-black overflow-y-auto relative">
            <div className="space-y-3">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className="bg-red-800 p-3 rounded-lg text-white shadow-md relative group"
                    >
                        {editingMessage === msg._id ? (
                            // ✅ Editing mode: Show input field
                            <div>
                                <input
                                    type="text"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    className="w-full px-2 py-1 rounded bg-red-700 text-white focus:outline-none"
                                />
                                <div className="flex justify-end mt-2">
                                    <button 
                                        onClick={saveEditedMessage} 
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 mr-2"
                                    >
                                        ✅ Save
                                    </button>
                                    <button 
                                        onClick={() => setEditingMessage(null)} 
                                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                                    >
                                        ❌ Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // ✅ Regular display mode
                            <>
                                <p><b>{msg.sender?.username || 'Unknown'}</b>: {msg.text}</p>
                                <span className="text-sm text-gray-400">{formatTimestamp(msg.createdAt)}</span>

                                {/* Show "edited at" timestamp if available */}
                                {msg.editedAt && (
                                    <span className="text-sm text-gray-500 ml-2">(Edited {formatTimestamp(msg.editedAt)})</span>
                                )}

                                {/* Show buttons only for the user's own messages when hovered */}
                                {msg.sender?._id === user._id && (
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => startEditing(msg)}
                                            className="bg-yellow-500 text-black px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => confirmDelete(msg)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-red-900 p-6 rounded-lg text-white text-center shadow-lg">
                        <h2 className="text-xl font-bold">Are you sure?</h2>
                        <p className="mt-2">This action cannot be undone.</p>
                        <div className="mt-4 flex justify-center">
                            <button 
                                onClick={deleteMessage} 
                                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 mr-2"
                            >
                                Yes, Delete
                            </button>
                            <button 
                                onClick={() => setShowConfirmation(false)} 
                                className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
