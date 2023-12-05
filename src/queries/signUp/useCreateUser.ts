'use client';

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

const axiosPost = async (userData: SignUpData) => {
  const response = await axios.post(BASE_URL + URL, userData);
  return response.data;
};

const useCreateUser = () => {
  return useMutation({ mutationFn: axiosPost });
};
export default useCreateUser;
