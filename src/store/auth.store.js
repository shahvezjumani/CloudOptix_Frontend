import { create } from "zustand";
import { login, logout, logoutAll, restoreSession } from "../api/auth.api";

const authStore = (set) => ({
  user: null,
  authReady: false, // true once initAuth completes

  // Called once on app mount
  init: async () => {
    const user = await restoreSession();
    set({ user, authReady: true });
  },

  login: async (credentials) => {
    const response = await login(credentials);
    set({ user: response.data.user });
    return response;
  },

  logout: async () => {
    await logout();
    set({ user: null });
  },

  logoutAll: async () => {
    await logoutAll();
    set({ user: null });
  },

  setUser: (user) => set({ user }),
});

const useAuthStore = create(authStore);

export default useAuthStore;
