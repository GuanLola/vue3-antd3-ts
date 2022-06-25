<template>
  <div class="permission-container" @click="jump">
    权限管理
    <div>
      <svg height="150" width="400">
        <defs>
          <linearGradient class="line" id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"></stop>
            <stop offset="100%"></stop>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)"></ellipse>
      </svg>
    </div>
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
.line {
  :nth-child(1) {
    stop-color:rgb(255,255,0);stop-opacity:1
  }
  :nth-child(2) {
    stop-color:rgb(255,0,0);stop-opacity:1
  }
}
</style>
