import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants/apiConst';
import useAuth from '@/stores/auth';
import Cookies from 'js-cookie';

const useEdutubeAxios = () => {
  const { accessToken } = useAuth(store => store);
  const refreshToken = Cookies.get('refreshToken');

  const edutubeAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
  });

  /** 1. 요청 전 - access토큰있는데 만료되면 refresh토큰도 헤더담아서 요청보내기 */
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
  // edutubeAxios.interceptors.response.use(
  //   async (response: AxiosResponse) => {
  //     if (response.headers.authorization) {
  //       const newAccessToken = response?.headers?.authorization;
  //       deleteAccessToken(); // 만료된 access토큰 삭제
  //       setAccessToken(newAccessToken); // 새걸로 교체
  //       response.config.headers.Authorization = `${newAccessToken}`;
  //     }
  //     return response;
  //   },
  //   error => {
  //     //응답 200 아닌 경우 - 디버깅
  //     return Promise.reject(error);
  //   },
  // );

  return { edutubeAxios };
};
export default useEdutubeAxios;
