import React from 'react';

const HomeArea = () => {
    return (
        <div className="flex flex-col items-center justify-center flex-grow bg-gradient-to-r from-red-900 to-black text-white">
            <h1 className="text-4xl font-bold">Welcome to NodeChat</h1>
            <p className="text-lg mt-4 max-w-2xl text-center">
                NodeChat is your secure, peer-to-peer messaging platform. Select a user from the list to start chatting, and enjoy seamless communication with a modern interface.
            </p>
        </div>
    );
};

export default HomeArea;
