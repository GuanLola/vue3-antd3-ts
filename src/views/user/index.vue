<template>
  <div class="user-container">
    <div class="main">
      <h1 class="main-title">Welcome to WE</h1>
      <div class="normal-title">
        <a :class="classObj('login')" @click="changeActive('login')">login</a>
        <b>·</b>
        <a :class="classObj('register')" @click="changeActive('register')">register</a>
      </div>
      <Login />
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