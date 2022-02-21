<template>
  <!--  <page-container :title="route.meta.title">-->
  <!--    &lt;!&ndash; 主内容区 &ndash;&gt;-->
  <!--    <div style="height: 120vh">产品管理</div>-->
  <!--  </page-container>-->
  <basic-page title="产品管理">
    <div style="height: 120vh">
      产品管理列表页
      <a-button type="primary" @click="handleAdd">新增产品</a-button>
      <a-button @click="handleGoFlow">流程工作台</a-button>
    </div>
  </basic-page>
</template>

<script setup lang="ts">
import { LikeOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import BasicPage from '@/layouts/BasicPage.vue'
import { RouteName } from '@/router/typings'

const route = useRoute()
const router = useRouter()

const handleLayout = () => {
  router.push('/login')
}

const handleAdd = () => {
  router.push({ name: RouteName.PRODUCT_DETAIL })
}

const handleGoFlow = () => {
  router.push('/config')
}
</script>
