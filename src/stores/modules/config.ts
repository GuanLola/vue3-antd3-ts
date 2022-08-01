import { reactive } from 'vue'
import store from '@/stores'
import { defineStore } from "pinia"
import { STORE_CONFIG } from '@/stores/constant/cacheKey'

export const useConfigStore = defineStore({
  id: 'config',
  state: () => {
    const layout = reactive({
      /* 顶栏 */
      // 顶栏文字色
      headerBarTabColor: '#000'
    })

    const lang = reactive({
      defaultLang: 'zh-cn',
      langArray: [
        { name: 'zh-cn', value: '中文简体' },
        { name: 'en', value: 'English' }
      ]
    })
    return {
      layout,
      lang
    }
  },
  actions: {
    setLang (val: string) {
      this.lang.defaultLang = val
    }
  },
  persist: {
    key: STORE_CONFIG
  }
})