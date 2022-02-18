<template>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link" @click.prevent>.jasjsad</a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">编辑阶段</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">在右边插入新阶段</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">在左边插入新阶段</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">删除阶段</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <!--  <div class="w-[200px] bg-amber-600 h-[100px]"></div>-->
</template>

<script lang="ts" setup></script>
