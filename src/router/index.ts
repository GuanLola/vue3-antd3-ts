import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import table from './modules/table' // table modules
const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
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
          title: '首页',
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
  {
    path: '/permission',
    name: 'Permission',
    redirect: '/permission/index',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: 'HddOutlined',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/permission/index.vue'),
        name: 'PermissionIndex',
        meta: {
          title: '权限管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'PermissionDirective',
        meta: {
          title: '指令权限'
        }
      }
    ]
  },
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
