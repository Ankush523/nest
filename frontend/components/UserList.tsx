import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}
  
export const UserList = () => {
    const [users, setUsers] = useState<User[]>([]); // Using the User interface
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('/api/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }, []);
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 mb-4 w-full text-black"
        />
        <div>
          {users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
            <div key={index} className="border-b py-2">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };