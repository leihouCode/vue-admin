<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :menu-data="menuData"
    :breadcrumb="{ routes: breadcrumb }"
    :iconfont-url="iconfontUrl"
    v-bind="proConfig"
  >
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <img src="https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg" />
        <h1>Antdv Pro</h1>
      </router-link>
    </template>
    <template #rightContentRender>
      <RightContent />
    </template>
    <!-- custom breadcrumb itemRender  -->
    <template #breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        <HeartOutlined />
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{ path: route.path, params }">
        <SmileOutlined />
        {{ route.breadcrumbName }}
      </router-link>
    </template>
    <setting-drawer v-model="proConfig" />
    <router-view />
    <template #footerRender>
      <GlobalFooter
        :links="[
          { title: 'Github', href: 'https://github.com/sendya/preview-pro' },
          { title: 'Ant Design Vue', href: 'https://2x.antdv.com' },
        ]"
        copyright="2021 &copy; Sendya"
      />
    </template>
  </pro-layout>
</template>

<script setup lang="ts">
import { reactive, watchEffect, computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { GlobalFooter, getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout';
import type { RouteContextProps } from '@ant-design-vue/pro-layout';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons-vue';
import RightContent from '../components/RightContent/index.vue';

// const iconfontUrl = '//at.alicdn.com/t/font_3173740_1eadjat9inz.js';
const iconfontUrl = '/iconfont.js';
// //at.alicdn.com/t/font_3173740_1eadjat9inz.js
const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));
console.log('menu data =>', menuData);

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // defualt openKeys
  selectedKeys: [], // default selectedKeys
});
const proConfig = ref({
  layout: 'mix',
  fixedHeader: false,
  fixSiderbar: false,
  splitMenus: false,

  menuHeaderRender: undefined,
  footerRender: undefined,
  headerRender: undefined,
});
const breadcrumb = computed(() =>
  router.currentRoute.value.matched.concat().map(item => {
    return {
      path: item.path,
      breadcrumbName: item.meta.title || '',
    };
  }),
);

watchEffect(() => {
  if (router.currentRoute) {
    console.log('router', router.currentRoute.value);
    const matched = router.currentRoute.value.matched.concat();
    state.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path);
    state.openKeys = matched
      .filter(r => r.path !== router.currentRoute.value.path)
      .map(r => r.path);
  }
});
</script>
