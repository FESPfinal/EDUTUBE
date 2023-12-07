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
      },
    });

    return response.data.file;
  };

  return useMutation({ mutationFn: (file: FormData) => axiosPost(file) });
};
export default useCreateFile;
