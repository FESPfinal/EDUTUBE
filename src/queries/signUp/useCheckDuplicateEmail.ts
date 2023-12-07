import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const URL = (email: string) => `/users/email?email=${email}`;

const useCheckDuplicateEmail = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosGet = (email: string) => edutubeAxios.get(URL(email));
  return useMutation({ mutationFn: axiosGet });
};

export default useCheckDuplicateEmail;
