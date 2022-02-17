<template>
  <div class="bg-white">
    <FlowDesign></FlowDesign>
  </div>
</template>

<script setup lang="ts">
import { LikeOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import FlowDesign from '@/components/FlowDesign/index.vue'

const route = useRoute()
const router = useRouter()

const handleLayout = () => {
  router.push('/login')
}
</script>
