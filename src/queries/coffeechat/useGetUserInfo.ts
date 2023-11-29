import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = 'users/2/name';

const axiosGet = async () => {
    const response = await axios.get(BASE_URL + URL, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJpYXQiOjE3MDEyNjQ2MTYsImV4cCI6MTcwMTI3MTgxNiwiaXNzIjoiRkVTUDAxIn0.HMcrJLTTDy-kII8LeJqgrTu83D9H3YsEgLjiIXIPO6s`,
      },
    });
    // profile image 추가 예정
    return response.data.item.name;
  }

  const useGetUserInfo = (_id: string) => {
    return useQuery({queryKey: ['UserInfo'], queryFn: axiosGet})
  }

export default useGetUserInfo;