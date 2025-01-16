const API_BASE_URL = 'http://localhost:2000/api';

export const fetchMessages = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token
    const response = await fetch('http://localhost:2000/api/messages', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`, // Add the token here
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }

    return response.json();
};


// Save a new message
export const saveMessage = async (message) => {
    const token = localStorage.getItem('token'); // Retrieve the token
    const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
    });

    if (!response.ok) {
        throw new Error('Failed to save message');
    }

    return response.json();
};


export const fetchUserInfo = async (userId) => {
    try {
        const response = await fetch(`http://localhost:2000/api/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user information.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};
