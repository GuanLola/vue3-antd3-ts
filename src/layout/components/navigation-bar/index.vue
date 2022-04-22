<template>
  <div class="navbar">
    <div class="right-menu">
      <a-dropdown>
        <a-avatar :size="'large'">
          <template #icon><UserOutlined /></template>
        </a-avatar>

        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="handleLogout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/modules/user";
import { UserOutlined } from "@ant-design/icons-vue";

const handleLogout = () => {
  useUserStore().logout();
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .right-menu {
    float: right;
    height: 100%;
    margin-right: 20px;
    display: flex;
    align-items: center;
    color: #333;
  }
}
</style>
