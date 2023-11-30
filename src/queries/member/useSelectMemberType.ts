import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const user_id = Cookies.get('user_id');
const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = `/users/${user_id}/type`;

const axiosGet = async () => {
  const accessToken = Cookies.get('accessToken');

  const response = await axios.get(BASE_URL + URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.item;
};

const useSelectMemberType = () => {
  return useQuery({ queryKey: ['MemberType'], queryFn: axiosGet });
};

export default useSelectMemberType;
