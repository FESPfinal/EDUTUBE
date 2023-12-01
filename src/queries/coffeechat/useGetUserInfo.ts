import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const user_id = Cookies.get('user_id');
const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = `users/${user_id}/name`;

const axiosGet = async () => {
  const accessToken = Cookies.get('user_id')
    const response = await axios.get(BASE_URL + URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // profile image 추가 예정
    return response.data.item.name;
  }

  const useGetUserInfo = (_id: string) => {
    return useQuery({queryKey: ['UserInfo'], queryFn: axiosGet})
  }

export default useGetUserInfo;