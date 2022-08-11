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
        <a-col :lg="6" class="hidden-md-and-down">
          <div class="working">
            <img class="working-coffee" :src="coffeeSvg" alt="" />
            <div class="working-text">
              {{ t('dashboard.You have worked today') }}<span class="time">{{ state.workingTimeFormat }}</span>
            </div>
            <div @click="onChangeWorkState" class="working-opt">
              {{ state.pauseWork ? t('dashboard.Continue to work') : t('dashboard.Have a bit of rest') }}
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import headerSvg from '@/assets/icons/advertisement.svg'
import coffeeSvg from '@/assets/icons/coffee.svg'
import { useI18n } from 'vue-i18n'
import { loadLang } from '@/lang/index'
import { useUserStore } from '@/stores/modules/user'
import { getGreet } from '@/utils/common.ts'
import { reactive, onMounted } from 'vue'
import { Local } from '@/utils/storage.ts'
import { WORKING_TIME } from '@/stores/constant/cacheKey.ts'
import moment from 'moment'
import { start } from 'nprogress'

var workTimer

const { t } = useI18n()
const d = new Date()

const useUser = useUserStore()

const state = reactive({
  workingTimeFormat: '',
  pauseWork: false
})

onMounted(() => {
  startWork()
})

const startWork = () => {
  const workingTime = Local.get(WORKING_TIME) || { date: '', startTime: 0, pauseTime: 0, startPauseTime: 0 }
  const currentDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  const time = parseInt((new Date().getTime() / 1000).toString())

  if (workingTime.date != currentDate) {
    workingTime.date = currentDate
    workingTime.startTime = time
    workingTime.pauseTime = workingTime.startPauseTime = 0
    Local.set(WORKING_TIME, workingTime)
  }

  let startPauseTime = 0
  if (workingTime.startPauseTime <= 0) {
    state.pauseWork = false
    startPauseTime = 0
  } else {
    state.pauseWork = true
    startPauseTime = time - workingTime.startPauseTime // 已暂停时间
  }

  let workingSeconds = time - workingTime.startTime - workingTime.pauseTime - startPauseTime
  /*
    当前时间 - 最初开始工作时间 - 之前总停掉的时间 - 上一次到此刻停下来的时间
  */

  state.workingTimeFormat = formatSeconds(workingSeconds)
  if (!state.pauseWork) {
    workTimer = setInterval(() => {
      workingSeconds++
      state.workingTimeFormat = formatSeconds(workingSeconds)
    }, 1000)
  }
}

/* moment 秒 转化成 X天X分X秒 */
const formatSeconds = (seconds) => {
  const d = moment.duration(seconds, 'seconds')
  const res = Math.floor(d.asDays()) + t('dashboard.day') + d.hours() + t('dashboard.hour') + d.minutes() + t('dashboard.minute') + d.seconds() + t('dashboard.second')
  return res
}

const onChangeWorkState = () => {
  const time = parseInt((new Date().getTime() / 1000).toString())
  const workingTime = Local.get(WORKING_TIME)

  if (state.pauseWork) {
    // 继续工作
    workingTime.pauseTime += time - workingTime.startPauseTime
    workingTime.startPauseTime = 0
    Local.set(WORKING_TIME, workingTime)
    state.pauseWork = false
    startWork()
  } else {
    // 暂停工作
    workingTime.startPauseTime = time
    Local.set(WORKING_TIME, workingTime)
    clearInterval(workTimer)
    state.pauseWork = true
  }
}

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
  user-select: none;

  &.suspension {
    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 14px 24px rgba(0, 0, 0, 0.2);
      border-radius: 6px;
    }
  }

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

.working {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;

  &:hover {
    .working-coffee {
      transform: translateY(-4px) scale(1.02);
      z-index: 999;
    }
  }

  .working-coffee {
    width: 80px;
    transition: all 0.3s ease;
  }
  
  .working-text {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: var(--color-text-primary);
  }

  .working-opt {
    position: absolute;
    top: -40px;
    right: 10px;
    background-color: rgba($color: #000000, $alpha: 0.3);
    padding: 10px 20px;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    opacity: 0;
    z-index: 999;
    transition: all 0.3s ease;
  }

  &:hover {
    .working-opt {
      opacity: 1;
      top: 0px;
    }
  }
}
</style>