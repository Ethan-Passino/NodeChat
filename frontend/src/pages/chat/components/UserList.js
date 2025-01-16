import React, { useState } from 'react';

const UserList = ({ users = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
        user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gradient-to-r from-red-800 to-red-900 w-64 p-4 text-white overflow-y-scroll">
            <h2 className="font-bold text-lg mb-4">Online Users</h2>
            {/* Search Bar */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full p-2 mb-4 rounded bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {/* User List */}
            <ul className="space-y-2">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <li
                            key={index}
                            className="p-2 rounded bg-red-700 shadow-md transition-transform transform hover:scale-105"
                        >
                            {user}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-400">No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
