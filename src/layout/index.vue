<template>
  <div :class="classObj">
    <SideBar />
    <div class="main-container" :style="{ marginLeft: collapsed ? '80px' : '220px' }">
      <NavigationBar />
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { AppMain, SideBar, NavigationBar } from "./components";
import { useMenuStore } from '@/stores/modules/menu';

const collapsed = computed(() => useMenuStore().collapsed)

const classObj = computed(() => {
  return {};
});
</script>
<style lang="scss" scoped>
$sideBarWidth: 220px;

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}
</style>
