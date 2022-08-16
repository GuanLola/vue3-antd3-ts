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

    <div class="small-panel-box">
      <a-row :gutter="24">
        <a-col v-for="item in state.panelArray" :xs="24" :sm="24" :md="24" :lg="24" :xl="6" :xxl="6" :xxxl="6">
          <div class="small-panel suspension">
            <div class="small-panel-title">{{ item.name }}</div>
            
            <div class="small-panel-content">
              <div class="content-left">
                <span class="icon-span">
                  <i :class="iconClass(item.icon)"></i>
                </span>
                <span class="user_reg_number">{{ filterNum(item.num) }}</span>
              </div>
              <div class="content-right">+{{ item.percent }}%</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="growth-chart">
      <a-row :gutter="24">
        <a-col class="lg-mb-20" :xs="24" :sm="24" :md="12" :lg="9">
          <a-card :title="t('dashboard.Membership growth')">
            <div class="user-growth-chart" :ref="chartRefs.set"></div>
          </a-card>
        </a-col>

        <a-col class="lg-mb-20" :xs="24" :sm="24" :md="12" :lg="9">
          <a-card :title="t('dashboard.Annex growth')">
            <div class="file-growth-chart" :ref="chartRefs.set"></div>
          </a-card>
        </a-col>

        <a-col :xs="24" :sm="24" :md="24" :lg="6">
          <a-card class="new-user-card" shadow="hover" :title="'刚刚加入的会员'">
            <div class="new-user-growth">
              <div v-for="item in 10" class="new-user-item">
                <img class="new-user-avatar" src="~assets/images/login-header.png" alt="" />
                <div class="new-user-base">
                  <div class="new-user-name">{{ t('dashboard.Good code') }}</div>
                  <div class="new-user-time">{{ t('dashboard.Joined us') }} <span>12{{ t('dashboard.Minutes ago') }}</span></div>
                </div>
                <i class="new-user-arrow fa fa-angle-right"></i>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import headerSvg from '@/assets/icons/advertisement.svg'
import coffeeSvg from '@/assets/icons/coffee.svg'
import { useI18n } from 'vue-i18n'
import { loadLang } from '@/lang/index'
import { useUserStore } from '@/stores/modules/user'
import { getGreet } from '@/utils/common.ts'
import { reactive, onMounted } from 'vue'
import { Local } from '@/utils/storage.ts'
import { WORKING_TIME } from '@/stores/constant/cacheKey.ts'
import { start } from 'nprogress'
import moment from 'moment'
import { useTemplateRefsList } from '@vueuse/core'
import * as echarts from 'echarts'
import { nextTick } from 'process'

const chartRefs = useTemplateRefsList<HTMLDivElement>()

var workTimer

const { t } = useI18n()

const d = new Date()

const useUser = useUserStore()

const state = reactive({
  workingTimeFormat: '',
  pauseWork: false,
  panelArray: [
    {
      name: t('dashboard.Member registration'),
      num: 5456,
      percent: 14,
      icon: 'fa-line-chart'
    },
    {
      name: t('dashboard.Number of attachments Uploaded'),
      num: 1234,
      percent: 50,
      icon: 'fa-file-text'
    },
    {
      name: t('dashboard.Total number of members'),
      num: 9486,
      percent: 28,
      icon: 'fa-user'
    },
    {
      name: t('dashboard.Number of installed plug-ins'),
      num: 875,
      percent: 88,
      icon: 'fa-object-group'
    }
  ],
  charts: []
})

onMounted(() => {
  startWork()
  initUserGrowthChart()
  initFileGrowthChart()
  window.addEventListener('resize', echartsResize)
})

/* 在div显示后手动条用resize调整尺寸 -> 改变图表尺寸，在容器大小发生改变时需要手动调用。 */
const echartsResize = () => {
  nextTick(() => {
    for (const key in state.charts) {
      state.charts[key].resize()
    }
  })
}

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

const filterNum = (val) => {
  return Number(val).toLocaleString()
}

const iconClass = (icon) => {
  let obj = {
    fa: true
  }
  obj[icon] = true
  return obj
}

const initUserGrowthChart = () => {
  const userGrowthChart = echarts.init(chartRefs.value[0] as HTMLElement)

  const option = {
    grid: {
      top: 0,
      right: 0,
      bottom: 20,
      left: 0
    },
    xAxis: {
      data: [
        t('dashboard.Monday'),
        t('dashboard.Tuesday'),
        t('dashboard.Wednesday'),
        t('dashboard.Thursday'),
        t('dashboard.Friday'),
        t('dashboard.Saturday'),
        t('dashboard.Sunday')
      ]
    },
    yAxis: {},
    legend: {
      data: [t('dashboard.Visits'), t('dashboard.Registration volume')]
    },
    series: [
      {
        name: t('dashboard.Visits'),
        data: [100, 160, 280, 230, 190, 200, 480],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#8595F4'
        }
      },
      {
        name: t('dashboard.Registration volume'),
        data: [45, 180, 146, 99, 210, 127, 288],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#F48595',
          opacity: 0.5
        }
      }
    ]
  }

  userGrowthChart.setOption(option)
  state.charts.push(userGrowthChart)
}

const initFileGrowthChart = () => {
  const fileGrowthChart = echarts.init(chartRefs.value[1] as HTMLElement)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      bottom: 15,
      data: (function () {
        var list = []
        for (var i = 1; i <=12; i++) {
          list.push(i + t('dashboard.month'))
        }
        return list
      })()
    },
    visualMap: {
      top: 'middle',
      right: 10,
      color: ['red', 'yellow'],
      calculable: true
    },
    radar: {
      indicator: [
        { name: t('dashboard.picture') },
        { name: t('dashboard.file') },
        { name: t('dashboard.form') },
        { name: t('dashboard.Compressed package') },
      ]
    },
    series: (function () {
      var series = [];
      for (var i = 1; i <= 28; i++) {
        series.push({
          type: 'radar',
          symbol: 'none',
          lineStyle: {
            width: 1
          },
          emphasis: {
            areaStyle: {
              color: 'rgba(0,250,0,0.3)'
            }
          },
          data: [
            {
              value: [(40 - i) * 10, (38 - i) * 4 + 60, i * 5 + 10, i * 20],
              name: i + t('dashboard.month')
            }
          ]
        });
      }
      return series;
    })()
  }

  fileGrowthChart.setOption(option)
  state.charts.push(fileGrowthChart)
}

</script>

<style>
.ant-card-body {
  overflow-y: scroll;
}
</style>

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

@media screen and (max-width: 1000px) {
  .working {
    display: none;
  }
}

.small-panel-box {
  margin-top: 20px;

  .icon-span {
    font-size: 20px;
    color: #8595F4;
    margin-right: 10px;
  }

  .small-panel {
    background-color: #e9edf2;
    padding: 25px;
    margin-bottom: 20px;
    border-radius: var(--border-radius-base);
    transition: all 0.3s ease;

    &.suspension {
      &:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 14px 24px rgba(0, 0, 0, 0.2);
        border-radius: 6px;
      }
    }

    .small-panel-title {
      color: #92969a;
      font-size: 15px;
    }

    .small-panel-content {
      display: flex;
      align-items: flex-end;
      margin-top: 20px;
      color: #2c3f5d;

      .content-left {
        font-size: 24px;
      }

      .content-right {
        font-size: 18px;
        margin-left: auto;
      }
    }
  }

  
}

.user-growth-chart {
  height: 260px;
}

.file-growth-chart {
  height: 260px;
}

.new-user-growth {
  height: 259px;

  .new-user-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    margin: 0 0 20px 0;

    .new-user-avatar {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .new-user-base {
      margin-left: 15px;
      color: #2c3f5d;
      .new-user-name {
        font-size: 13px;
      }
      .new-user-time {
        font-size: 13px;
        span {
          font-size: 12px;
          color: #8595F4;
        }
      }
    }
    .new-user-arrow {
      margin-left: auto;
      color: #8595F4;
      font-size: 26px;
    }
  }
}
</style>