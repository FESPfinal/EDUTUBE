import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserNotTokenItem = {
  _id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  extra: {};
};

export type UserInfo = {
  userInfo: UserNotTokenItem;
  setUserInfo: (userInfo: UserNotTokenItem) => void;
  deleteUserInfo: () => void;
};

const defaultState: UserNotTokenItem = {
  _id: 0,
  email: '',
  name: '',
  phone: '',
  address: '',
  type: '',
  createdAt: '',
  updatedAt: '',
  extra: {},
};

/**
 * 유저의 전체 데이터
 */
const useUserInfo = create(
  persist<UserInfo>(
    set => ({
      userInfo: defaultState,
      setUserInfo: (userInfo: UserNotTokenItem) => {
        set({ userInfo });
      },
      deleteUserInfo: () => {
        set({ userInfo: defaultState });
        localStorage.clear();
      },
    }),
    {
      name: 'user-info',
      getStorage: () => localStorage, // 로컬 스토리지 사용
    },
  ),
);

export default useUserInfo;
