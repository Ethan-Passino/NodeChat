import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const passwordRequirements = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if emails match
        if (formData.email !== formData.confirmEmail) {
            newErrors.email = "Emails do not match.";
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            newErrors.password = "Passwords do not match.";
        }

        // Check password requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.passwordRequirements = passwordRequirements;
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
            navigate("/login");
            
        } else {
            console.log("Validation failed:", errors);
        }
    };

    return (
        <div className="bg-gradient-to-r from-red-900 to-black min-h-screen flex flex-col text-white">
            <NavBar />
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-3xl font-extrabold mb-4">Sign Up</h1>
                <form className="bg-red-800 p-4 rounded-lg shadow-md w-80 space-y-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmEmail" className="block text-sm font-medium mb-1">Confirm Email</label>
                        <input 
                            type="email" 
                            id="confirmEmail" 
                            name="confirmEmail" 
                            value={formData.confirmEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Confirm your email"
                            required
                        />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <p className="text-xs text-gray-300 mb-1">{passwordRequirements}</p>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
                    {errors.passwordRequirements && <p className="text-red-400 text-xs">{errors.passwordRequirements}</p>}
                    <button 
                        type="submit" 
                        className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-1.5 px-3 rounded-full shadow-md transition duration-300 transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-3 text-xs">
                    Already have an account? <a href="/login" className="text-red-400 hover:text-red-300 underline">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;