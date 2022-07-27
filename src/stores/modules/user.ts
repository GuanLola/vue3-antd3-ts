import store from '@/stores'
import { defineStore } from "pinia";
import { token } from "@/utils/cookies";

interface IUserState {
  token: string;
  roles: string[];
  username: string;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => {
    return {
      token: token.getToken() || "",
      roles: [],
      username: '🌍 地球人'
    };
  },
  actions: {
    login () {
      return new Promise((resolve) => {
        token.setToken("fake-jwt-token");
        resolve(true);
      });
    },
    logout() {
      token.removeToken();
      window.location.reload();
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        this.roles = ["admin"];
        resolve({ roles: ["admin"] });
      });
    }
  },
});

export function useUserStoreHook() {
  return useUserStore(store)
}
