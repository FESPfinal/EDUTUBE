'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type LoginData = {
  email: string;
  password: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/users/login';

const axiosPost = async (data: LoginData) => {
  const response = await axios.post(BASE_URL + URL, data);
  return response.data.item;
};

const useLogin = () => {
  return useMutation({ mutationFn: (data: LoginData) => axiosPost(data) });
};

export default useLogin;
