import { createApp } from 'vue'
import store from './stores'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/router/permission'

import App from './App.vue'
import router from './router'

// global svg icon
import loadSvg from '@/icons'
import 'virtual:svg-icons-register'

import '@/assets/global.less'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const app = createApp(App)

import * as antIcons from '@ant-design/icons-vue' // 引入ant icons所有的图标
const antIconsList: any = antIcons // 重新赋值定义类型 避免后续遍历注册组件的时候ts报错
for (const key in antIconsList) {
  app.component(key, antIconsList[key])
}
app.config.globalProperties.$antIcons = antIcons // 挂在vue实例上 

app.use(store).use(router).use(Antd)
loadSvg(app)

app.config.globalProperties.$httpUrl = 'https://www.baidu.com'
// const { proxy } = getCurrentInstance()
// console.log(proxy.$httpUrl)

app.mount('#app')
