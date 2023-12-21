'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';

const URL = '/files';

const useCreateFile = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosPost = async (file: FormData) => {
    const response = await edutubeAxios.post(URL, file);
    return response.data.file;
  };

  return useMutation({ mutationFn: (file: FormData) => axiosPost(file) });
};
export default useCreateFile;
