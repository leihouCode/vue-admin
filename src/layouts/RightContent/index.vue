<template>
  <div class="mr-[24px] text-white flex items-center">
    <BellOutlined class="mr-[15px] text-lg" />
    <UserOutlined class="text-lg mr-[5px]" />
    <a-dropdown>
      <a class="text-white hover:text-white">用户</a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <template #icon>
              <LogoutOutlined />
            </template>
            <span>退出</span>
          </a-menu-item>
        </a-menu>
      </template>
      <a-avatar shape="square" size="small">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { LogoutOutlined, BellOutlined, UserOutlined } from '@ant-design/icons-vue'
</script>
