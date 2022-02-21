import { RouteRecordRaw } from 'vue-router'
import BlankLayout from '../../layouts/BlankLayout.vue'
import { RouteName } from '@/router/typings'
import { getPathByName } from '@/router/services'

export const workbenchRoutes: RouteRecordRaw[] = [
  {
    path: getPathByName(RouteName.CONFIGURE_MANAGEMENT),
    name: RouteName.CONFIGURE_MANAGEMENT,
    meta: { title: '工作台管理' },
    component: BlankLayout,
    redirect: () => ({ name: RouteName.PRODUCT_LIST }),
    children: [
      {
        path: getPathByName(RouteName.PRODUCT_LIST),
        name: RouteName.PRODUCT_LIST,
        meta: { title: '产品管理' },
        component: () => import('@/views/configure/product/list.vue'),
      },
    ],
  },
]
export const dd = ''
