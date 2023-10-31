import type { RouteRecordRaw } from 'vue-router'

const baseLayoutRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/layouts/ChatLayout/index.vue'),
    redirect: '/chat/2001',
    children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/pages/Chat/index.vue'),
      },
    ],
  },
  {
    path: '/aigc',
    name: 'BaseLayout',
    component: () => import('@/layouts/BaseLayout/index.vue'),
    redirect: '/aigc/title_gen',
    children: [
      {
        path: 'title_gen',
        name: 'TitleGenerate',
        component: () => import('@/pages/aigc/TitleGenerate/index.vue'),
      },
      {
        path: 'text_zip',
        name: 'TextZip',
        component: () => import('@/pages/aigc/TextCompression/index.vue'),
      },
      {
        path: 'generate_content',
        name: 'GenerateContent',
        component: () => import('@/pages/aigc/GenerateContent/index.vue'),
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
