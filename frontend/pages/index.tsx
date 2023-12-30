import React from 'react';
import { UserRegistration } from '../components/UserRegistration';
import { UserList } from '../components/UserList';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <UserRegistration />
      <h2 className="text-xl font-bold mt-8 mb-4">Registered Users</h2>
      <UserList />
    </div>
  );
};

export default Home;
