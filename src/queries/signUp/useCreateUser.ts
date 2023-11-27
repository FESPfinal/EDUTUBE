'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://localhost/api';
const URL = '/users';

const useCreateUser = () => {
  return useQuery({
    queryKey: [URL],
    queryFn: async () => {
      const response = await axios.post(BASE_URL + URL, {
        email: 'test@market.com',
        password: '11111111',
        name: 'postman',
        phone: '0118889999',
        address: '서울시 강남구 역삼동 123',
        type: 'user',
        extra: {
          birthday: '03-23',
          address: [
            {
              id: 1,
              name: '집',
              value: '서울시 강남구 역삼동 123',
            },
            {
              id: 2,
              name: '회사',
              value: '서울시 강남구 신사동 234',
            },
          ],
        },
      });
      return response.data;
    },
  });
};
export default useCreateUser;
