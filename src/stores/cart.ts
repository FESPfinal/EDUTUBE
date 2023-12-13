import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultState: number = 0;

type UserCartItem = {
  userCartCount: number;
  setUserCartCount: (count: number) => void;
  deleteUserCartCount: () => void;
};

const useUserCartInfo = create(
  persist<UserCartItem>(
    set => ({
      userCartCount: defaultState,
      setUserCartCount: (count: number) => {
        set({ userCartCount: count });
      },
      deleteUserCartCount: () => {
        set({ userCartCount: 0 });
      },
    }),
    {
      name: 'user-cart',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserCartInfo;
