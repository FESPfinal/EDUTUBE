import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://localhost/api';
const URL = (email: string) => `/users/email?email=${email}`;

const useCheckDuplicateEmail = () => {
  return useMutation({ mutationFn: (email: string) => axios.get(BASE_URL + URL(email)) });
};

export default useCheckDuplicateEmail;
