'use client';

import { BASE_URL } from '@/helper/constants/apiConst';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const URL = '/files';

const useCreateFile = () => {
  const axiosPost = async (file: FormData) => {
    const response = await axios.post(BASE_URL + URL, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        //TODO: 현재 회원가입할 때도 AccessToken이 필요한 문제가 있음.
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJpYXQiOjE3MDE1NzczMjksImV4cCI6MTcwMTU4NDUyOSwiaXNzIjoiRkVTUDAxIn0.X0v9eiQzTL2S8aqe-F_2Puee90PDSokJJRZq9upPR3s`,
      },
    });

    return response.data.file;
  };

  return useMutation({ mutationFn: (file: FormData) => axiosPost(file) });
};
export default useCreateFile;
