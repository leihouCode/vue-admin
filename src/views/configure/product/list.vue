<template>
  <!--  <page-container :title="route.meta.title">-->
  <!--    &lt;!&ndash; 主内容区 &ndash;&gt;-->
  <!--    <div style="height: 120vh">产品管理</div>-->
  <!--  </page-container>-->
  <basic-page has-page-header title="产品管理">
    <template #Header>1111</template>
    <div style="height: 120vh">产品管理</div>
  </basic-page>
</template>

<script setup lang="ts">
import { LikeOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import BasicPage from '@/layouts/BasicPage.vue'

const route = useRoute()
const router = useRouter()

const handleLayout = () => {
  router.push('/login')
}
</script>
