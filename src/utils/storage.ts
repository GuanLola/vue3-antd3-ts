/*
window.localStorage
@method set 设置
@method get 获取
@method remove 移除
@method clear 移除全部
*/
export const Local = {
  set(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  get(key: string) {
    let json:any = window.localStorage.getItem(key)
    return JSON.parse(json)
  },
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  }
}