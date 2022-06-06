import { request } from "@/utils/service";

interface IUsers {
  phone: string;
  password: string;
  remember?: boolean;
}

class Users {
  /* register */
  static register(data: IUsers) {
    return request({
      url: 'users/register',
      method: 'post',
      data
    })
  }

  /* login */
  static login(data: IUsers) {
    return request({
      url: "users/login",
      method: "post",
      data,
    });
  }
}

export { Users };