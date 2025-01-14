import React, { useState } from 'react';
import NavBar from "../components/NavBar";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if username/email is provided
        if (!formData.usernameOrEmail) {
            newErrors.usernameOrEmail = "Username or email is required.";
        }

        // Check if password is provided
        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Form is valid, proceed with submission logic (API calls later)
            console.log("Form submitted:", formData);
        } else {
            console.log("Validation failed:", errors);
        }
    };

    return (
        <div className="bg-gradient-to-r from-red-900 to-black min-h-screen flex flex-col text-white">
            <NavBar />
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-extrabold mb-8">Log In</h1>
                <form className="bg-red-800 p-6 rounded-lg shadow-md w-96 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="usernameOrEmail" className="block text-sm font-medium mb-2">Username or Email</label>
                        <input 
                            type="text" 
                            id="usernameOrEmail" 
                            name="usernameOrEmail" 
                            value={formData.usernameOrEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter your username or email"
                            required
                        />
                    </div>
                    {errors.usernameOrEmail && <p className="text-red-400 text-sm">{errors.usernameOrEmail}</p>}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                    <button 
                        type="submit" 
                        className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-sm">
                    Don't have an account? <a href="/signup" className="text-red-400 hover:text-red-300 underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
