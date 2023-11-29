'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/users';
export type SignUpData = {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  extra: {
    profileImage: File | undefined;
    major: string;
    nickname: string;
    contactEmail: string;
    intro?: string;
    sns?: string;
  };
};

const useCreateUser = () => {
  return useMutation({
    mutationFn: async (userData: SignUpData) => {
      console.log(userData);
      const response = await axios.post(BASE_URL + URL, userData);
      return response.data;
    },
  });
};
export default useCreateUser;
