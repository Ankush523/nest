import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"

export const UserRegistration = ({ onUserAdded }: { onUserAdded: (user: any) => void }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/register', user);
      alert('User registered successfully!');
      onUserAdded(response.data);
      setUser({ name: '', email: '', phone: '' });
    } catch (error) {
      alert('Error registering user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-xl text-white">
      <div>
        <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wide">Name</label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-gray-300"
          placeholder="Jiara Martins"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-gray-300"
          placeholder="hello@reallygreatsite.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wide">Phone</label>
        <input
          type="tel"
          id="phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-gray-300"
          placeholder="123-456-7890"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-black rounded-md py-2 mt-6 font-bold uppercase tracking-widest hover:bg-opacity-90"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Sign Up'}
      </Button>
    </form>
  );
};
