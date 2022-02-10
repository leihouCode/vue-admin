<template>
  <page-container title="login" sub-title="show current project dependencies">
    <template #content>
      <strong>Content Area</strong>
    </template>
    <template #extra>
      <strong>Extra Area</strong>
    </template>
    <template #extraContent>
      <strong>ExtraContent Area</strong>
    </template>
    <template #tags>
      <a-tag>Tag1</a-tag>
      <a-tag color="pink">Tag2</a-tag>
    </template>
    <a-card title="Project Version">
      <p v-for="d in new Array(10)" :key="d">text block...</p>
    </a-card>
    <a-button @click="handleLogin">login</a-button>
    <a-button type="primary">test</a-button>
  </page-container>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const handleLogin = () => {
  console.log('login');
  router.push('/');
};
</script>
