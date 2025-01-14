import React from 'react';

const HomePage = () => {
    return (
        <div className="bg-gradient-to-r from-red-900 to-black min-h-screen flex flex-col">
            {/* Navigation Bar */}
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

            {/* Hero Section */}
            <header className="flex-grow flex flex-col justify-center items-center text-center text-white">
                <h2 
                    className="text-5xl font-extrabold mb-4 transition duration-500 ease-in-out transform hover:scale-125 hover:text-red-400"
                >
                    Welcome to NodeChat
                </h2>
                <p className="text-lg max-w-2xl">
                    NodeChat is your go-to peer-to-peer messaging platform with secure communication and a user-friendly interface. 
                    Connect, chat, and share like never before!
                </p>
                <div className="mt-6">
                    <a 
                        href="/signup" 
                        className="bg-red-800 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-600 transition duration-500 ease-in-out transform hover:scale-125"
                        style={{ transition: 'transform 0.5s ease-in-out, background-color 0.5s ease-in-out' }}
                    >
                        Get Started
                    </a>
                </div>
            </header>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-red-800 to-red-900 py-4 mt-auto">
                <div className="container mx-auto text-center">
                    <p className="text-white">&copy; 2025 NodeChat. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
