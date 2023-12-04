import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/users/refresh';

const useRefreshToken = async () => {
  const refreshToken = Cookies.get('refreshToken');
  return await axios.get(BASE_URL + URL, { headers: { Authorization: `Bearer ${refreshToken}` } });
};
