import axios from 'axios';
import { api } from '../util/api';

export const getThreadByTag = async (email: string, tagName: string) => {
  try {
    const response = await api.post('/thread/tag', { email, tagName });
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || 'Error fetching thread data'
      );
    } else {
      throw new Error('Error fetching thread data');
    }
  }
};
