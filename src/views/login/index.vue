<template>
  <div class="container">
    <a-button @click.prevent="handleLogin">login</a-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";

const router = useRouter();

const handleLogin = () => {
  useUserStore()
    .login()
    .then(() => {
      console.log("login success");
      router.push({ path: "/" });
    });
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}
</style>
