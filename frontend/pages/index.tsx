import React, { useState, useEffect } from 'react';
import { UserRegistration } from '../components/UserRegistration';
import { UserList } from '../components/UserList';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = (newUser: User) => {
    setUsers(currentUsers => [...currentUsers, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mx-auto p-10 bg-black h-[100%]">
      <div className="max-w-2xl mx-auto rounded-lg p-6 bg-white dark:bg-gray-800 animate-slideIn">
        <h1 className="text-2xl font-semibold mb-4 text-center text-indigo-600 dark:text-indigo-300">User Registration</h1>
         <UserRegistration onUserAdded={addUser} />
      </div>

      <div className="max-w-4xl mx-auto mt-12 rounded-lg p-6 bg-white dark:bg-gray-800 animate-fadeIn">
        <h2 className="text-xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-300">Registered Users</h2>
        <UserList users={users} />
      </div>
    </div>
  );
};

export default Home;
