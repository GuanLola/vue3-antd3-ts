<template>
  <div class="user-container">
    <div class="main">
      <h1 class="main-title">Welcome to WE</h1>
      <!-- <div class="normal-title">
        <a :class="classObj('login')" @click="changeActive('login')">手机登录</a>
      </div> -->
      <Login v-if="active.type === 'login'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Login from './login.vue'

import { reactive } from 'vue'

const active = reactive({
  type: 'login'
})

const classObj = (type: string) => {
  return {
    'active': active.type === type
  }
}

const changeActive = (type: string) => {
  active.type = type
}

</script>
<style lang='scss' scoped>
.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  
  
  .main {
    width: 340px;
    border-radius: 5px;
    padding: 50px 20px;

    h1.main-title {
      text-align: center;
    }

    .normal-title {
      display: flex;
      justify-content: center;
      font-size: 18px;
      b {
        padding: 0 10px;
      }
      
      a {
        &.active {
          border-bottom: 2px solid #1890ff;
        }
      }
    }
  }
}
</style>