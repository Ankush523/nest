import axios from 'axios';

interface User {
  email: string;
  phone: string;
  name: string;
}

const userService = {
  async getAllUsers(page: number = 1, limit: number = 10, search: string = ''): Promise<User[]> {
    try {
      const response = await axios.get(`http://localhost:3000/users?page=${page}&limit=${limit}&search=${search}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
};

export default userService;
