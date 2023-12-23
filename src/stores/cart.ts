import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultState: number = 0;

type UserCartItem = {
  userCartCount: number;
  setUserCartCount: (count: number) => void;
  increaseUserCartCount: () => void;
  decreaseUserCartCount: (decreaseCount: number) => void;
  deleteUserCartCount: () => void;
};

const useUserCartInfo = create(
  persist<UserCartItem>(
    (set, get) => ({
      userCartCount: defaultState,
      setUserCartCount: (count: number) => {
        set({ userCartCount: count });
      },
      increaseUserCartCount: () => {
        set(state => ({
          userCartCount: state.userCartCount + 1,
        }));
      },
      decreaseUserCartCount: (decreaseCount: number) => {
        set(state => ({ userCartCount: state.userCartCount - decreaseCount }));
      },
      deleteUserCartCount: () => {
        set({ userCartCount: 0 });
        localStorage.clear();
      },
    }),
    {
      name: 'user-cart',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserCartInfo;
