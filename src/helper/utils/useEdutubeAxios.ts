import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants/apiConst';
import useAuth from '@/stores/auth';
import Cookies from 'js-cookie';
import useUserInfo from '@/stores/userInfo';
import { useRouter } from 'next/navigation';

const useEdutubeAxios = () => {
  const router = useRouter();

  const { accessToken, deleteAccessToken, setAccessToken } = useAuth(store => store);
  const { deleteUserInfo } = useUserInfo(store => store);
  const refreshToken = Cookies.get('refreshToken');

  const logout = () => {
    deleteAccessToken();
    deleteUserInfo();
    Cookies.remove('userType');
    Cookies.remove('refreshToken');
    router.refresh();
    router.push('/');
  };

  const edutubeAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
  });

  /** 1. 요청 전 - access토큰 header에 설정 */
  edutubeAxios.interceptors.request.use(
    config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  /** 4. 응답 전 - 새 access토큰받으면 갈아끼기 */
  edutubeAxios.interceptors.response.use(
    response => {
      // 응답 성공 시 처리 로직
      return response;
    },
    async error => {
      // 응답 에러 처리 로직
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (refreshToken) {
          try {
            const { data } = await axios.get(BASE_URL + '/users/refresh', {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });
            setAccessToken(data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return edutubeAxios(originalRequest);
          } catch (error) {
            // 리프레시 토큰 갱신 실패 시 로그아웃 등의 처리
            logout();
            return Promise.reject(error);
          }
        } else {
          // 리프레시 토큰이 없을 경우 로그아웃 등의 처리
          logout();
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

  return { edutubeAxios };
};
export default useEdutubeAxios;
