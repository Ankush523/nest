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
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-indigo-300 rounded p-2 mb-4 w-full text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="space-y-4">
        {currentUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
            <p className="text-lg font-semibold text-gray-800">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Phone: {user.phone}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => i + 1).map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-4 py-2 rounded ${number === currentPage ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-300'}`}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
