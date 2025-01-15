import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const UpdateProfilePage = ( {handleLogout} ) => {
    const userId = localStorage.getItem('userId');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const [formData, setFormData] = useState({
        newUsername: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.newPassword !== formData.confirmNewPassword) {
            newErrors.newPassword = "Passwords do not match.";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (formData.newPassword && !passwordRegex.test(formData.newPassword)) {
            newErrors.newPassword = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch(`http://localhost:2000/api/users/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        newUsername: formData.newUsername,
                        currentPassword: formData.currentPassword,
                        newPassword: formData.newPassword,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    setMessage('Profile updated successfully!');
                } else {
                    setErrors({ general: data.message || 'Error updating profile.' });
                }
            } catch (error) {
                setErrors({ general: 'An error occurred. Please try again later.' });
                console.error('Update error:', error);
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-red-900 to-black min-h-screen flex flex-col text-white">
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-extrabold mb-8">Update Profile</h1>
                <form className="bg-red-800 p-6 rounded-lg shadow-md w-96 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="newUsername" className="block text-sm font-medium mb-2">New Username</label>
                        <input
                            type="text"
                            id="newUsername"
                            name="newUsername"
                            value={formData.newUsername}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter new username"
                        />
                    </div>
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter current password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Confirm new password"
                        />
                    </div>
                    {errors.newPassword && <p className="text-red-400 text-sm">{errors.newPassword}</p>}
                    {errors.general && <p className="text-red-400 text-sm">{errors.general}</p>}
                    <button
                        type="submit"
                        className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
                    >
                        Update Profile
                    </button>
                </form>
                {message && <p className="text-green-400 mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default UpdateProfilePage;
