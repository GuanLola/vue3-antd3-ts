<template>
  <RouterView />
</template>

<script setup lang="ts">
import iconfontInit from '@/utils/iconfont'
import { onMounted } from 'vue'

onMounted(() => {
  iconfontInit()
})
</script>

