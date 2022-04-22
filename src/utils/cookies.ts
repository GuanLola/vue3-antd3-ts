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

export { token };
