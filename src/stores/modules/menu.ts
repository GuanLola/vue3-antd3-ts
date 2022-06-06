import store from '@/stores'
import { defineStore } from "pinia"
import { collapsed } from "@/utils/cookies"

console.log(collapsed.getCollapsed())

export const useMenuStore = defineStore({
  id: "menu",
  state: () => {
    return {
      collapsed: collapsed.getCollapsed() || false
    }
  },
  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
      collapsed.setCollapsed(this.collapsed)
    }
  }
})

export function useMenuStoreHook() {
  return useMenuStore(store)
}