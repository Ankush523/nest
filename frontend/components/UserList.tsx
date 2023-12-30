import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-indigo-300 rounded p-2 mb-4 w-full text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="space-y-4">
        {users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
            <p className="text-lg font-semibold text-gray-800">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Phone: {user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
