import { request } from "@/utils/service";

/** 登录，返回 token */
export function accountLogin(data) {
  return request({
    url: "users/login",
    method: "post",
    data,
  });
}
/** 获取用户详情 */
export function userInfoRequest() {
  return request({
    url: "users/info",
    method: "post",
  });
}
