import { create } from "zustand";

const authStore = (set) => ({
  isAuthenticated: false,
  login: set(() => ({
    isAuthenticated: true,
  })),
  logOut: set(() => ({
    isAuthenticated: false,
  })),
});

const useAuthStore = create(authStore);

export default useAuthStore;
