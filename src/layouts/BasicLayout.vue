<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :menu-data="menuData"
    header-theme="light"
    :breadcrumb="{ routes: breadcrumb }"
    v-bind="proConfig"
  >
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <img src="https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg" />
        <span class="text-base text-white">自研产品交付平台</span>
      </router-link>
    </template>
    <template #rightContentRender>
      <RightContent />
    </template>
    <!-- custom breadcrumb itemRender  -->
    <template #breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{ path: route.path, params }">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
    <router-view />
    <!--    <setting-drawer v-model="proConfig" />-->
  </pro-layout>
</template>

<script setup lang="ts">
import { reactive, watchEffect, computed, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { GlobalFooter, getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout'
import type { RouteContextProps } from '@ant-design-vue/pro-layout'
import RightContent from './RightContent/index.vue'
import { baseConfig } from '@/config/config'
import { getPathByName } from '@/router/services'

const iconfontUrl = '/iconfont.js'
const router = useRouter()
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()))

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // defualt openKeys
  selectedKeys: [], // default selectedKeys
})
const proConfig = ref(baseConfig)
const breadcrumb = computed(() =>
  router.currentRoute.value.matched.concat().map(item => {
    return {
      path: item.path,
      breadcrumbName: item.meta.title || '',
    }
  }),
)

watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat()
    const { activeMenuRouteName = '' } = router.currentRoute.value.meta
    state.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path)
    state.openKeys = matched.filter(r => r.path !== router.currentRoute.value.path).map(r => r.path)
    if (!activeMenuRouteName) return
    const parentIndex = matched.findIndex(r => r.path === router.currentRoute.value.path) - 1
    if (parentIndex < 0) return
    const parentPath = matched[parentIndex].path
    state.selectedKeys.push(getPathByName(activeMenuRouteName, `${parentPath}/`))
  }
})
</script>
