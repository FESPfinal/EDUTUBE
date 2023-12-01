import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const user_id = Cookies.get('user_id');
const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = (property: string) => `/users/${user_id}/${property}`;

const axiosGet = async (property: string) => {
  const accessToken = Cookies.get('accessToken');

  const response = await axios.get(BASE_URL + URL(property), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.item;
};

const useSelectMemberInfo = (property: string) => {
  return useQuery({ queryKey: ['MemberInfo'], queryFn: () => axiosGet(property) });
};

export default useSelectMemberInfo;
