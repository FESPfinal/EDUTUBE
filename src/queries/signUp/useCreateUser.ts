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
    const response = await edutubeAxios.post(URL, userData);
    return response.data;
  };
  return useMutation({ mutationFn: axiosPost });
};
export default useCreateUser;
