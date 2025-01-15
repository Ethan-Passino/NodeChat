export const fetchMessages = async () => {
    const response = await fetch('http://localhost:2000/api/messages');
    return response.json();
};

export const sendMessage = async (message) => {
    const response = await fetch('http://localhost:2000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
    });
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
