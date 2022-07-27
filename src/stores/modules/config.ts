import { reactive } from 'vue'
import store from '@/stores'
import { defineStore } from "pinia"

export const useConfigStore = defineStore({
  id: "config",
  state: () => {
    const lang = reactive({
      defaultLang: 'zh-ch',
      langArray: [
        { name: 'zh-cn', value: '中文简体' },
        { name: 'en', value: 'English' }
      ]
    })
    return {
      lang
    }
  },
  actions: {
  }
})

export function useMenuStoreHook() {
  return useConfigStore(store)
}