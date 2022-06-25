<template>
  <div>
    {{ count }} | {{ result }}
    <br />
    {{ refNum }}
  </div>
</template>

<script lang="ts" setup>
import { effect, reactive, ref, getCurrentInstance } from 'vue'
let count = reactive({ num: 11 })
let result = 0
effect(() => {
  result = count.num + 1
})

// expect(result).toBe(12)
// count.num = 12
// expect(result).toBe(13)

const refNum = ref(11)
effect(() => {
  refNum.value = count.num + 1
})
refNum.value = 16

// app.config.globalProperties.$httpUrl = 'https://www.baidu.com'
const { appContext : { config: { globalProperties } } } = getCurrentInstance()
console.log(globalProperties.$httpUrl)


const { proxy } = getCurrentInstance()
console.log(proxy.$httpUrl)

</script>
<style lang='scss' scoped>
</style>