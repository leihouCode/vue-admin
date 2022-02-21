<template>
  <img :src="`/src/assets/icons/${props.name}.png`" :style="imgStyle" />
  <!--  <img :src="imgSrc" />-->
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  width: {
    type: String || Number,
    default: 16,
  },
})

const imgStyle = computed(() => {
  return ` width: ${+props.width}px; height: ${+props.width}px;`
})

// const icons = import.meta.globEager('@/assets/icons/*')
// const imgSrc = new URL(`../assets/icons/${props.name}.png`, import.meta.url).href
</script>
