<template>
  <div class="div">
    <h1 v-if="hasTitle">{{ title }}</h1>
    <slot name="Header"></slot>
    <div class="bg-white rounded-[4px] mt-[16px]">
      <div v-if="hasPageHeader" class="h-[60px] flex items-center pl-[24px] container-header">
        <!--        <LeftOutlined class="mr-[5px]" />-->
        <ImageIcon name="left-outlined" />
        <div class="container-title">{{ title }}</div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, computed } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import ImageIcon from '@/components/ImageIcon/index.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  hasPageHeader: {
    type: Boolean,
    default: false,
  },
})

const hasTitle = computed(() => !props.hasPageHeader)
</script>

<style scoped>
.container-title {
  @apply font-bold text-[18px] text-[#3A3A3D];
}
.container-header {
  border-bottom: 1px solid #f4f5f7;
  width: 100%;
}
</style>
