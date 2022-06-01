import Cookies from "js-cookie";
import Keys from "@/constant/key";

class token {
  // set token
  static setToken(token: string) {
    Cookies.set(Keys.token, token);
  }
  // get token
  static getToken() {
    return Cookies.get(Keys.token);
  }
  // remove token
  static removeToken() {
    Cookies.remove(Keys.token);
  }
}

class collapsed {
  // set collapsed
  static setCollapsed(collapsed: boolean) {
    Cookies.set(Keys.collapsed, collapsed.toString());
  }
  // get collapsed
  static getCollapsed() {
    return !!Cookies.get(Keys.collapsed);
  }
  // remove collapsed
  static removeCollapsed() {
    Cookies.remove(Keys.collapsed);
  }
}

export { token, collapsed };
