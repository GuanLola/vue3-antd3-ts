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

app.use(store).use(router).use(Antd)
loadSvg(app)

app.mount('#app')
