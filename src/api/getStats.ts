// src/api/getStats.ts

import axios from 'axios';
import { api } from '../util/api';
import {
  MemberStatsRequest,
  MemberStatsResponse,
  AvgMemberStatsRequest,
} from '../types/MemberStats';

export const getMemberStats = async (
  email: string
): Promise<MemberStatsResponse> => {
  try {
    const endsAt = new Date();
    const startsAt = new Date(endsAt.getTime() - 7 * 24 * 60 * 60 * 1000);

    const formattedEndsAt = endsAt.toISOString();
    const formattedStartsAt = startsAt.toISOString();

    const requestData: MemberStatsRequest = {
      email,
      startAt: formattedStartsAt,
      endAt: formattedEndsAt,
    };

    const response = await api.post<MemberStatsResponse>(
      '/member/stats',
      requestData
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Axios Error (Member Stats):', error.response.data);
      throw new Error(
        error.response.data?.message || 'Error fetching member statistics'
      );
    } else {
      console.error('Unknown Error (Member Stats):', error);
      throw new Error('Error fetching member statistics');
    }
  }
};

export const getAvgAllMemberStats = async (): Promise<MemberStatsResponse> => {
  try {
    const endsAt = new Date();
    const startsAt = new Date(endsAt.getTime() - 7 * 24 * 60 * 60 * 1000);

    const formattedEndsAt = endsAt.toISOString();
    const formattedStartsAt = startsAt.toISOString();

    const requestData: AvgMemberStatsRequest = {
      startAt: formattedStartsAt,
      endAt: formattedEndsAt,
    };

    const response = await api.post<MemberStatsResponse>(
      '/member/all/stats',
      requestData
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Axios Error (Average Member Stats):', error.response.data);
      throw new Error(
        error.response.data?.message ||
          'Error fetching average member statistics'
      );
    } else {
      console.error('Unknown Error (Average Member Stats):', error);
      throw new Error('Error fetching average member statistics');
    }
  }
};
