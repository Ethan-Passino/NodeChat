import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-red-800 to-red-900 py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">NodeChat</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a 
                            href="/chat" 
                            className="text-white hover:text-red-400 transition duration-300 ease-in-out transform hover:scale-110"
                            style={{ transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out' }}
                        >
                            Chat
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/login" 
                            className="text-white hover:text-red-400 transition duration-300 ease-in-out transform hover:scale-110"
                            style={{ transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out' }}
                        >
                            Login
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/signup" 
                            className="text-white hover:text-red-400 transition duration-300 ease-in-out transform hover:scale-110"
                            style={{ transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out' }}
                        >
                            Sign Up
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
