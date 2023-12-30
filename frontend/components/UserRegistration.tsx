import React, { useState } from 'react';
import axios from 'axios';

export const UserRegistration = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', user);
      alert('User registered successfully!');
      setUser({ name: '', email: '', phone: '' }); // Reset form
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name</label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="border rounded p-2 w-full text-black"
        />
      </div>
      <div>
        <label htmlFor="email" className="block">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border rounded p-2 w-full text-black"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block">Phone</label>
        <input
          type="tel"
          id="phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="border rounded p-2 w-full text-black"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Register
      </button>
    </form>
  );
};
