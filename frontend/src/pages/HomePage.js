import React from 'react';
import NavBar from '../components/NavBar'

const HomePage = ({ isLoggedIn, handleLogout }) => {
    return (
        <div className="bg-gradient-to-r from-red-900 to-black min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>

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
