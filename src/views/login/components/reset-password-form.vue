<template>
  <div class="login-form">
    <div class="title flex justify-between items-center">
      <div>重置密码</div>
      <div class="text-sm text-[#4A81FE] cursor-pointer" @click="toLogin">去登录</div>
    </div>
    <a-form
      class="flex-1"
      :model="formState"
      name="login"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="" name="phone" :rules="[{ required: true, message: '请输入手机号码' }]">
        <a-input v-model:value="formState.phone" class="w-full h-[36px]" placeholder="手机号码" />
      </a-form-item>

      <a-form-item
        label=""
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password
          v-model:value="formState.password"
          class="w-full h-[36px]"
          placeholder="新密码"
        />
      </a-form-item>

      <a-form-item
        label=""
        name="password2"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password
          v-model:value="formState.password"
          class="w-full h-[36px]"
          placeholder="确认新密码"
        />
        <div class="login-text">
          密码必须是8-20位、包含大写字母、小写字母、数字、特殊符号的组合，且不能是键盘上的连续三位
        </div>
      </a-form-item>

      <a-form-item label="" name="imgCode">
        <div class="flex">
          <a-input
            v-model:value="formState.imgCode"
            class="h-[36px] flex-1"
            placeholder="验证码"
          ></a-input>
          <a-button class="!h-[36px] ml-[10px]">获取验证码</a-button>
        </div>
      </a-form-item>
      <a-button type="primary" class="!h-[36px]" block>提交</a-button>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs, PropType } from 'vue'
import { useRouter } from 'vue-router'

interface IFormState {
  phone: string
  password: string
  imgCode: string
}
interface EmitType {
  (e: 'trigger', data?: string): void
}
const props = defineProps({
  formState: {
    type: Object as PropType<IFormState>,
    default() {
      return {
        phone: '',
        password: '',
        imgCode: '',
      }
    },
  },
})
const emits = defineEmits<EmitType>()
const router = useRouter()

const { formState } = toRefs(props)

const handleLogin = () => {
  console.log('form', formState?.value)
}
const onFinish = (values: any) => {
  console.log('success', values)
}
const onFinishFailed = (errorInfo: any) => {
  console.log('error', errorInfo)
}

const toLogin = () => {
  emits('trigger', 'Login')
}
</script>

<style lang="less" scoped>
.login {
  .title {
    font-size: 18px;
    color: #212530;
    font-weight: 500;
    margin-bottom: 12px;
  }
  &-form {
    width: 400px;
    padding: 24px 36px 24px 36px;
    @apply flex flex-col;
  }
  &-text {
    font-size: 12px;
    width: 100%;
    text-align: left;
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
