<template>
  <a-result
    status="404"
    :style="{
      height: '100%',
      background: '#fff',
    }"
    title="Hello World"
    sub-title="Sorry, you are not authorized to access this page."
  >
    <template #extra>
      <a-button type="primary" @click="handleClick">layout</a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = () => {
  console.log('info');
  message.info('BackHome button clicked!');
  router.push('/login');
};
</script>
