'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  extra: {
    point: number;
    profileImage: string;
    major: string;
    nickname: string;
    contactEmail: string;
    intro?: string;
    sns?: string;
  };
};

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/users';

const useCreateUser = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosPost = async (userData: SignUpData) => {
    const requestData = { ...userData, extra: { ...userData.extra, point: 10000 } };
    const response = await edutubeAxios.post(URL, requestData);
    return response.data;
  };
  return useMutation({ mutationFn: axiosPost });
};
export default useCreateUser;
