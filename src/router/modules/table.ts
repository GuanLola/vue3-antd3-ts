const Layout = () => import('@/layout/index.vue')

export default {
  path: '/table',
  name: 'Table',
  redirect: '/table/basic',
  component: Layout,
  meta: {
    title: '列表页',
    icon: 'TableOutlined',
    roles: ['admin', 'editor'],
    alwaysShow: true
  },
  children: [
    {
      path: 'basic',
      component: () => import('@/views/table/basic.vue'),
      name: 'TableBasic',
      meta: {
        title: '基本表格',
        roles: ['admin', 'editor']
      }
    },
    {
      path: 'ajax',
      component: () => import('@/views/table/ajax.vue'),
      name: 'TableAjax',
      meta: {
        title: 'AJAX表格',
        roles: ['admin', 'editor']
      }
    }
  ]
}