<template>
  <div></div>
</template>

<script setup lang="ts">
import { LikeOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const handleLayout = () => {
  router.push('/login')
}
</script>
