import { useState } from 'react';
import AuthService from '../services/authService';
import UserModel from '../models/userModel';

interface IUserViewModel {
  user: UserModel | null;
  loading: boolean;
  error: string;
  login: (username: string, password: string) => Promise<void>;
}

const useUserViewModel = (): IUserViewModel => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const loggedInUser = await AuthService.login(username, password);
      setUser(loggedInUser);
      setError('');
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
  };
};

export default useUserViewModel;
