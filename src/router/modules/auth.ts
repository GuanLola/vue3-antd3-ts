const Layout = () => import('@/layout/index.vue')

export default {
  path: '/auth',
  name: 'auth',
  redirect: '/auth/group',
  component: Layout,
  meta: {
    title: '权限管理',
    icon: 'HddOutlined',
    roles: ['admin'],
    alwaysShow: true
  },
  children: [
    {
      path: 'group',
      component: () => import('@/views/auth/group/index.vue'),
      name: 'RoleGroupManagement',
      meta: {
        title: '角色组管理',
        roles: ['admin']
      }
    }
  ]
}