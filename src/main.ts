import { createApp } from 'vue'
import store from './stores'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/router/permission'

import App from './App.vue'
import router from './router'

import '@/styles/base.scss'

import { loadLang } from '@/lang/index'

// global svg icon
import loadSvg from '@/icons'
import 'virtual:svg-icons-register'

import '@/assets/global.less'

import * as antIcons from '@ant-design/icons-vue' // 引入ant icons所有的图标

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

async function start() {
  const app = createApp(App)

  const antIconsList: any = antIcons // 重新赋值定义类型 避免后续遍历注册组件的时候ts报错
  for (const key in antIconsList) {
    app.component(key, antIconsList[key])
  }
  app.config.globalProperties.$antIcons = antIcons // 挂在vue实例上

  app.use(store)

  // 全局语言包哦加载
  const i18n = await loadLang(app)

  app.use(router).use(Antd, { i18n: i18n.global.t })
  loadSvg(app)

  app.mount('#app')
}

start()
