import { RouteRecordRaw } from 'vue-router'
import BlankLayout from '../../layouts/BlankLayout.vue'
import { RouteName } from '@/router/typings'
import { getPathByName } from '@/router/services'

export const configureRoutes: RouteRecordRaw[] = [
  {
    path: getPathByName(RouteName.CONFIGURE_MANAGEMENT),
    name: RouteName.CONFIGURE_MANAGEMENT,
    meta: { title: '配置管理' },
    component: BlankLayout,
    redirect: () => ({ name: RouteName.PRODUCT_LIST }),
    children: [
      {
        path: getPathByName(RouteName.PRODUCT_LIST),
        name: RouteName.PRODUCT_LIST,
        meta: { title: '产品管理' },
        component: () => import('@/views/configure/product/list.vue'),
      },
      {
        path: getPathByName(RouteName.PRODUCT_DETAIL),
        name: RouteName.PRODUCT_DETAIL,
        meta: {
          title: '产品详情',
          hideInMenu: true,
          activeMenuRouteName: RouteName.PRODUCT_LIST,
        },
        component: () => import('@/views/configure/product/detail.vue'),
      },
    ],
  },
]
export const dd = ''
