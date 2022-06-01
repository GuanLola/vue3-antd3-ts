<template>
  <template v-if="!item.mata || !item.meata.hidden">
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <a-menu-item :key="resolvePath(theOnlyOneChild.path)">
          <template #icon>
            <PieChartOutlined />
          </template>
          <!-- <svg-icon v-if="theOnlyOneChild.meta && theOnlyOneChild.meta.icon" :name="theOnlyOneChild.meta.icon" /> -->
          <span v-if="theOnlyOneChild.meta.title">
            {{ theOnlyOneChild.meta.title }}
          </span>
        </a-menu-item>
      </SidebarItemLink>
    </template>
    <a-sub-menu v-else :key="resolvePath(item.path)">
      <template #icon>
        <PieChartOutlined />
      </template>
      
      
      <template #title>
        <!-- <svg-icon :name="item.meta.icon" /> -->
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :basePath="resolvePath(child.path)"
        />
      </template>
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import path from 'path'
import { isExternal } from "@/utils/validate";
import { computed, PropType } from "vue";
import SidebarItemLink from './sidebar-item-link.vue'
import { RouteRecordRaw } from 'vue-router';
import { PieChartOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  basePath: {
    type: String,
    required: true
  }
});

const alwaysShowRootMenu = computed(() => {
  return !!(props.item.meta && props.item.meta.alwaysShow);
});

const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter(
      (item) => !(item.meta || item.meta.hidden)
    );
    return showingChildren.length;
  }
  return 0;
});

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null;
  }

  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child;
      }
    }
  }

  return { ...props.item, path: "" };
});

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  return path.resolve(props.basePath, routePath);
};
</script>
<style lang="scss" scoped></style>
