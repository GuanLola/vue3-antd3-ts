<template>
  <div class="permission-container" @click="jump">
    权限管理
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const jump = () => {
  router.push({
    path: `/permission/directive`,
    query: {
      name: '权限管理'
    }
  })
}
</script>
<style lang="scss" scoped>
</style>
