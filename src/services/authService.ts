import UserModel from '../models/userModel';

const login = async (
  username: string,
  password: string,
): Promise<UserModel> => {
  // Giả lập API login
  const response = {
    ok: true,
    user: { id: 1, name: 'John Doe', email: 'john@example.com' },
  };

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return UserModel.fromJson(response.user);
};

export default {
  login,
};
