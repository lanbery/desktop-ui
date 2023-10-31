import type { RouteRecordRaw } from 'vue-router'

const baseLayoutRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/layouts/ChatLayout/index.vue'),
    children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/pages/Chat/index.vue'),
      },
    ],
  },
]

const authLayoutRoutes: RouteRecordRaw = {
  path: '/',
  name: 'authLayout',
  component: () => import('@/layouts/AuthLayout/index.vue'),
  children: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/login.vue'),
      meta: {
        title: '登录',
      },
    },
  ],

}

const allRoutes = [...baseLayoutRoutes].concat([authLayoutRoutes])

export default allRoutes
