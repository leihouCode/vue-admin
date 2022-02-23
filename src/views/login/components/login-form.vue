<template>
  <div class="login-form">
    <div class="title">用户登录</div>
    <a-form
      class="flex-1 relative flex-col"
      :model="formState"
      name="login"
      autocomplete="off"
      :rules="rulesRef"
      @finishFailed="onFinishFailed"
      @finish="onFinish"
    >
      <a-form-item label="" name="phone">
        <a-input v-model:value="formState.phone" class="w-full h-[42px]" placeholder="手机号码" />
      </a-form-item>

      <a-form-item label="" name="password">
        <a-input-password
          v-model:value="formState.password"
          class="w-full h-[42px]"
          placeholder="登录密码"
        />
      </a-form-item>

      <a-form-item label="" name="imgCode">
        <a-row type="flex" justify="space-between">
          <a-col :span="12">
            <a-input
              v-model:value="formState.imgCode"
              class="w-full h-[42px]"
              placeholder="图片验证码"
            ></a-input>
          </a-col>
          <div class="w-[128px] relative">
            <div class="img h-[42px] bg-gray-200"></div>
            <div class="login-text text-[#212530] absolute right-0">看不清？换一张</div>
          </div>
        </a-row>
      </a-form-item>
      <div class="absolute bottom-0 w-full">
        <a-button type="primary" class="!h-[42px]" block html-type="submit">登录</a-button>
        <div class="login-text text-[#4A81FE]" @click="toResetPassword">忘记密码 ？</div>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginFormState } from '@/views/login/typings'
import { loginFormRules } from '@/views/login/serivces'
import { useStore } from '@/store'
import { RouteName } from '@/router/typings'

const router = useRouter()
const store = useStore()
interface EmitType {
  (e: 'trigger', data?: string): void
}
const emits = defineEmits<EmitType>()

const onFinish = async (values: any) => {
  const res = await store.handleLogin(toRaw(values))
  console.log('res', res)
  await router.push({ name: RouteName.PRODUCT_LIST })
}
const onFinishFailed = (values: any) => {
  console.log('error', values)
}

const toResetPassword = () => {
  emits('trigger', 'ResetPassword')
}

const formState = ref({
  phone: '1',
  password: '1',
  imgCode: '1',
})
const rulesRef = ref(loginFormRules)
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
    text-align: right;
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
