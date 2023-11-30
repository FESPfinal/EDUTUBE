import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = (email: string) => `/users/email?email=${email}`;

const axiosGet = (email: string) => axios.get(BASE_URL + URL(email));

const useCheckDuplicateEmail = () => {
  return useMutation({ mutationFn: axiosGet });
};

export default useCheckDuplicateEmail;
