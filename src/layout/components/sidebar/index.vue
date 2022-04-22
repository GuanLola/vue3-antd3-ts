<template>
  <div class="side-bar">
    <a-menu
      mode="inline"
      theme="dark"
      :selectedKeys="activeMenu"
      :openKeys="openKeys"
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
import { computed, ref } from 'vue'
import SidebarItem from './sidebar-item.vue'
import { usePermissionStore } from '@/stores/modules/permission'
import { useRoute } from 'vue-router'

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
  width: 256px;
  height: calc(100% - 84px);
  transition: width 0.28s;
  width: 220px !important;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background: #001529;
}
</style>
