import { create } from 'zustand';

const useAuth = create(set => ({
  accessToken: '',
  setAccessToken: (token: string) => set({ token }),
  deleteUserInfo: () => set({ accessToken: '' }),
}));

export default useAuth;
