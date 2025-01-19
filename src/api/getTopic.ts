import axios from 'axios';
import { api } from '../util/api';

export const getTopic = async (email: string) => {
  try {
    const response = await api.post('/thread/topic', { email });
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || 'Error fetching topic data'
      );
    } else {
      throw new Error('Error fetching topic data');
    }
  }
};
