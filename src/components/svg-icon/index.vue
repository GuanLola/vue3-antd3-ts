<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="`#${name}`" />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true
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
