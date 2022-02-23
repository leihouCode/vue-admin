<template>
  <div class="login">
    <div class="login-container">
      <img class="login-img" src="@/assets/images/login.png" />
      <component :is="currentForm" @trigger="handleTrigger"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import LoginForm from './components/login-form.vue'
import ResetPasswordForm from './components/reset-password-form.vue'

const formComponents: any = {
  Login: LoginForm,
  ResetPassword: ResetPasswordForm,
}
const currentForm = shallowRef(LoginForm)
const handleTrigger = (formName: string) => {
  currentForm.value = formComponents[formName]
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/images/login-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  font-size: 12px;
  @apply flex justify-center items-center;

  &-container {
    width: 720px;
    height: 416px;
    border-radius: 0 16px 16px 0;
    @apply flex bg-white;
  }

  &-img {
    width: 320px;
    height: 416px;
  }
}
</style>
