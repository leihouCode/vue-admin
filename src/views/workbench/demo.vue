<template>
  <div class="page-wrap">
    <header class="page-header">
      <div class="flex items-center text-lg font-semibold text-[#3A3A3D]">
        <ImageIcon name="left-outlined" class="mr-[16px]"></ImageIcon>
        流程工作台编辑
      </div>
      <a-button type="primary" size="middle">保存</a-button>
    </header>
    <div class="flex-1">
      <flow-design></flow-design>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FlowDesign from '@/components/FlowDesign/index.vue'
import ImageIcon from '@/components/ImageIcon/index.vue'
</script>

<style lang="less">
.page-wrap {
  width: 100vw;
  height: 100vh;
  @apply flex flex-col;
  .page-header {
    width: 100vw;
    height: 60px;
    box-sizing: border-box;
    z-index: 999;
    padding: 0 24px;
    border-bottom: 1px solid #e1e3e6;
    @apply bg-white flex justify-between items-center;
  }
}
</style>
