import { create } from 'zustand';

type Auth = {
  accessToken: string;
  setAccessToken: (token: string) => void;
  deleteAccessToken: () => void;
};

const useAuth = create<Auth>(set => ({
  accessToken: '',
  setAccessToken: (token: string) => {
    set({ accessToken: token });
  },
  deleteAccessToken: () => set({ accessToken: '' }),
}));

export default useAuth;
