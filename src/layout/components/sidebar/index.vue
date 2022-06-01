<template>
  <div class="side-bar" :style="{ width: collapsed ? 'unset' : '220px' }">
    <div class="logo-nav">
      <img src="@/assets/images/logo.png" alt="" />
      <span v-show="!collapsed">WE创作平台</span>
    </div>

    <a-menu
      mode="inline"
      theme="dark"
      :selectedKeys="activeMenu"
      :openKeys="openKeys"
      :inline-collapsed="collapsed"
    >
      <SidebarItem
        v-for="routeItem in routes"
        :key="routeItem.path"
        :item="routeItem"
        :basePath="routeItem.path"
      />
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import SidebarItem from './sidebar-item.vue'
import { usePermissionStore } from '@/stores/modules/permission'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/modules/menu'

const collapsed = computed(() => useMenuStore().collapsed)

const route = useRoute()

const routes = computed(() => {
  return usePermissionStore().routes
})

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta !== null || meta !== undefined) {
    if (meta.activeMenu) {
      return [meta.activeMenu]
    }
  }
  return [path]
})

const openKeys = computed(() => {
  const { matched } = route
  if (matched.length > 0) {
    const { path } = matched[0]
    return [path]
  }
  return []
})

</script>

<style lang="scss" scoped>
.side-bar {
  height: calc(100% - 84px);
  transition: width 0.28s;
  // width: 220px !important;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background: #001529;

  .logo-nav {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    background: #001529;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 30px;
      margin-right: 10px;
    }
  }
}
</style>
