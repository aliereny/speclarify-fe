import { axiosClient } from "@/data/axiosClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      login: async (username, password) => {
        try {
          const response = await axiosClient.post("/login", {
            username,
            password,
          });
          const { access_token, refresh_token } = response.data;
          set({ accessToken: access_token, refreshToken: refresh_token });
        } catch (error: any) {
          throw new Error(
            error.response?.data?.message || "An error occurred during login.",
          );
        }
      },
      logout: () => set({ accessToken: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
