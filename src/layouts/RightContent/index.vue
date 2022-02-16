<template>
  <div class="mr-[24px]">
    <a-dropdown>
      <span class="text-white hover:text-white">
        用户1
        <DownOutlined />
      </span>
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
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons-vue'
</script>
