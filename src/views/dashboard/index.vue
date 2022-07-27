<template>
  <div class="default-main">
    <div class="banner">
      <a-row :gutter="10">
        <a-col :md="24" :lg="18">
          <div class="welcome suspension">
            <img :src="headerSvg" alt="" class="welcome-img" />
            <div class="welcome-text">
              <div class="welcome-title"></div>
              <div class="welcome-note"></div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import headerSvg from '@/assets/icons/advertisement.svg'
</script>
<style lang='scss' scoped>
</style>