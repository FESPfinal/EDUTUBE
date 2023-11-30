'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type LoginData = {
  email: string;
  password: string;
};

type UserItem = {
  _id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  extra: {};
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/users/login';

const axiosPost = async (data: LoginData) => {
  const response = await axios.post(BASE_URL + URL, data);
  return response.data.item as UserItem;
};

const useLogin = () => {
  return useMutation({ mutationFn: (data: LoginData) => axiosPost(data) });
};

export default useLogin;
