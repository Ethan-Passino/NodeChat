const API_BASE_URL = 'http://localhost:2000/api';
const DEFAULT_RECEIVER_ID = '6786e001cdc622acb81e9028'; // Default receiver ID

// Fetch messages between the current user and a selected user
export const fetchMessages = async (userId, contactId) => {
    const token = localStorage.getItem('token'); // Retrieve the token

    const response = await fetch(`${API_BASE_URL}/messages/${userId}/${contactId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token for authentication
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch messages');
    }
    return response.json();
};

// Save a new message
export const saveMessage = async (senderId, receiverId, text) => {
    const token = localStorage.getItem('token'); // Retrieve the token

    // Ensure required parameters are provided
    if (!senderId || !receiverId) {
        throw new Error('SenderId and ReceiverId are required to save a message.');
    }

    const messagePayload = {
        senderId,
        receiverId,
        text,
    };

    const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token for authentication
        },
        body: JSON.stringify(messagePayload), // Send the message payload
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save message');
    }

    return response.json();
};


// Fetch user information
export const fetchUserInfo = async (userId) => {
    const token = localStorage.getItem('token'); // Retrieve the token

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token for authentication
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user information.');
    }

    return response.json();
};
