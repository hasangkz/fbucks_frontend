import axios from 'axios';

const API_REGISTER_URL = '/api/auth/register';
const API_LOGIN_URL = '/api/auth/login';

const register = async (userData: any) => {
  const response = await axios.post(API_REGISTER_URL, userData);

  if (response.data) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        username: response.data.newUser.username,
        email: response.data.newUser.email,
        token: response.data.token,
      })
    );
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const login = async (userData: any) => {
  const response = await axios.post(API_LOGIN_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
