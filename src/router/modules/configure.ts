import { RouteRecordRaw } from 'vue-router'
import BlankLayout from '../../layouts/BlankLayout.vue'

export const configureRoutes: RouteRecordRaw[] = [
  {
    path: '/configure',
    name: 'configure',
    meta: { title: '配置管理' },
    component: BlankLayout,
    redirect: () => ({ name: 'configureList' }),
    children: [
      {
        path: 'configure-list',
        name: 'configureList',
        meta: { title: '产品管理' },
        component: () => import('@/views/configure/product/list.vue'),
      },
      {
        path: 'configure-detail',
        name: 'configureDetail',
        meta: { title: '产品详情' },
        component: () => import('@/views/configure/product/detail.vue'),
      },
    ],
  },
]
export const dd = ''
