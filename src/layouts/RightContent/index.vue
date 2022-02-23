<template>
  <div class="mr-[24px] text-white flex items-center">
    <BellOutlined class="mr-[15px] text-lg" />
    <UserOutlined class="text-lg mr-[5px]" />
    <a-dropdown>
      <a class="text-white hover:text-white">用户</a>
      <template #overlay>
        <a-menu @click="onClick">
          <a-menu-item key="logout">
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
import { MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { RouteName } from '@/router/typings'

const router = useRouter()

const handleLogout = () => {
  const hide = message.loading('注销中...', 0)
  const timeout = setTimeout(() => {
    hide()
    router.replace({ name: RouteName.LOGIN })
    clearTimeout(timeout)
  }, 500)
}
const ACTION: any = {
  logout: handleLogout,
}
const onClick: MenuProps['onClick'] = ({ key }) => {
  console.log(key)
  ACTION[key].call(this)
}
</script>
