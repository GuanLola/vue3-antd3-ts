<template>
  <div class="default-main">
    <div class="banner">
      <a-row :gutter="10">
        <a-col :md="24" :lg="18">
          <div class="welcome suspension">
            <img :src="headerSvg" alt="" class="welcome-img" />
            <div class="welcome-text">
              <div class="welcome-title">{{ useUser.username + t('utils.comma') + getGreet() }}</div>
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
import { getGreet } from '@/utils/common.ts'

const { t } = useI18n()

const useUser = useUserStore()
</script>

<style lang='scss' scoped>
.welcome {
  background: #E1EAF9;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 0 30px 0 rgba(82, 63, 105, 0.05);
  transition: all 0.3s ease;

  .welcome-img {
    height: 100px;
    margin-right: 10px;
    user-select: none;
  }

  .welcome-text {

    .welcome-title {
      font-size: 1.5rem;
      line-height: 30px;
      color: var(--color-primary-sub-0);
    }
    .welcome-note {
      font-size: 15px;
      padding-top: 6px;
      color: var(--color-text-primary);
    }

  }
}
.welcome.suspension {
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
}
</style>