import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { token } from "@/utils/cookies";
import { whiteList } from "@/config/white-list";
import { useUserStoreHook } from "@/stores/modules/user";
import { usePermissionStoreHook } from "@/stores/modules/permission";

const userStore = useUserStoreHook()
const permissionStore = usePermissionStoreHook()

NProgress.configure({ showSpinner: false });

router.beforeEach(async(to, from, next) => {
  NProgress.start();
  if (token.getToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (userStore.roles.length === 0) {
        // 检查用户是否已获得权限角色
        await userStore.getInfo();
        const roles = userStore.roles;
        permissionStore.setRoutes(roles)
        permissionStore.dynamicRoutes.forEach(v => {
          router.addRoute(v)
        })
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
