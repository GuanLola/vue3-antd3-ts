<template>
  <!-- rel="noopener" NO OPENER safe window.opener set null -->
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <template v-else>
    <slot />
  </template>
</template>

<script lang="ts" setup>
import { isExternal } from "@/utils/validate";
import { useRouter } from "vue-router";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const router = useRouter()
const push = () => {
  router.push(props.to).catch(err => {
    console.log(err);
  });
}
</script>
<style lang='scss' scoped>
</style>