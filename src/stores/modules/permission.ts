import { RouteRecordRaw } from 'vue-router'
import store from "@/stores";
import { defineStore } from "pinia";
import { constantRoutes, asyncRoutes } from "../../router";

interface IPermissionState {
  routes: RouteRecordRaw[];
  dynamicRoutes: RouteRecordRaw[];
}

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.roles) {
        return route.meta.roles.includes(role);
      } else {
        return false
      }
    });
  } else {
    return true;
  }
};

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
};

export const usePermissionStore = defineStore({
  id: "permission",
  state: (): IPermissionState => {
    return {
      routes: [],
      dynamicRoutes: [],
    };
  },
  actions: {
    setRoutes(roles: string[]) {
      let accessedRoutes: RouteRecordRaw[];
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      this.routes = constantRoutes.concat(accessedRoutes);
      this.dynamicRoutes = accessedRoutes;
    },
  },
});


export function usePermissionStoreHook() {
  return usePermissionStore(store)
}