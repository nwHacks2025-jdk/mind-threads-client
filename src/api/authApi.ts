import axios from 'axios';

export const login = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.post(`/api/member`, { email });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error: unknown) {
    console.error('Login Error:', error);

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      const statusCode = error.response?.status || 500;
      throw new Error(`${statusCode}: ${errorMessage}`);
    }

    throw new Error('Login failed');
  }
};
