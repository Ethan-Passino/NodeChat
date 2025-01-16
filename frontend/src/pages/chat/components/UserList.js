import React from 'react';

const UserList = ({ users }) => {
    return (
        <div className="bg-gradient-to-r from-red-800 to-red-900 w-64 p-4 text-white overflow-y-scroll">
            <h2 className="font-bold text-lg mb-4">Online Users</h2>
            <ul className="space-y-2">
                {users.map((user, index) => (
                    <li key={index} className="p-2 rounded bg-red-700 shadow-md transition-transform transform hover:scale-105">
                        {user}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
