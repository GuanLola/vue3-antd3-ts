<template>
  <div class="default-main">
    <div class="banner">
      <a-row :gutter="10">
        <a-col :md="24" :lg="18">
          <div class="welcome suspension">
            <img :src="headerSvg" alt="" class="welcome-img" />
            <div class="welcome-text">
              <div class="welcome-title">{{ useUser.username + t('utils.comma') }}</div>
              <div class="welcome-note">{{ t('dashboard.join us') }}</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import headerSvg from '@/assets/icons/advertisement.svg'
import { useI18n } from 'vue-i18n'
import { loadLang } from '@/lang/index'
import { useUserStore } from '@/stores/modules/user'

const { t } = useI18n()

const useUser = useUserStore()

</script>
<style lang='scss' scoped>
</style>