import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
import BlankLayout from '../layouts/BlankLayout.vue'
import { configureRoutes } from '@/router/modules/configure'
import { RouteName } from '@/router/typings'
import { getPathByName } from '@/router/services'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { title: 'Home' },
      component: BasicLayout,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          meta: { title: '欢迎' },
          component: () => import('../views/page1.vue'),
        },
        ...configureRoutes,
        // {
        //   path: '/admins',
        //   name: 'admins',
        //   meta: { title: '管理页' },
        //   component: BlankLayout,
        //   redirect: () => ({ name: 'page1' }),
        //   children: [
        //     {
        //       path: 'page-1',
        //       name: 'page1',
        //       meta: { title: '一级页面' },
        //       component: () => import('../views/admins/page1.vue'),
        //     },
        //     {
        //       path: 'page-2',
        //       name: 'page2',
        //       meta: { title: '二级页面' },
        //       component: () => import('../views/admins/page1.vue'),
        //     },
        //     {
        //       path: 'dynamic-match/:id(\\d+)',
        //       name: 'dynamic-match',
        //       // 路由 path 默认参数再 meta.params 里
        //       meta: { title: '动态参数页面', params: { id: 1 } },
        //       component: () => import('../views/admins/dynamic-match.vue'),
        //     },
        //   ],
        // },
      ],
    },
    {
      path: '/app',
      name: 'login',
      meta: { title: 'Login' },
      component: BlankLayout,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'l',
          meta: { title: '222' },
          component: () => import('../views/login/index.vue'),
        },
      ],
    },
    {
      path: '/demo',
      name: 'demo',
      meta: { title: '工作台配置' },
      component: BlankLayout,
      redirect: '/config',
      children: [
        {
          path: '/config',
          name: RouteName.FLOW_WORKBENCH,
          meta: { title: 'ddd' },
          component: () => import('@/views/workbench/demo.vue'),
        },
      ],
    },
  ],
})
