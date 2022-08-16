import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import table from './modules/table' // table modules
import auth from './modules/auth' // table modules
const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/',
    name: 'dashboard',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '控制台',
          icon: 'HomeOutlined'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
  }
]

export const asyncRoutes: RouteRecordRaw[] = [
  /* 权限管理 */
  { ...auth },
  // 列表页
  { ...table },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
