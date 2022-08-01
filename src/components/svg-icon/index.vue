<template>
  <svg class="svg-icon" aria-hidden="true" :style="iconStyle">
    <use :href="`#${name}`" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue"

interface Props {
    name: string,
    color: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  color: '#000'
})

const iconStyle = computed(() => {
  return {
    color: props.color
  }
})

</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 10px;
  margin-top: -3px;
  vertical-align: middle;
}
</style>
