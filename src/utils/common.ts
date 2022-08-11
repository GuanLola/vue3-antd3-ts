import { i18n } from "@/lang"

export const getGreet = () => {
  const now = new Date()
  const hour = now.getHours()

  let greet = ''
  
  switch (true) {
    case (hour < 5): {
      greet = i18n.global.t('utils.Late at night, pay attention to your body!')
      break
    }
    case (hour < 9): {
      greet = i18n.global.t('utils.good morning!') + i18n.global.t('utils.welcome back')
      break
    }
    case (hour < 12): {
      greet = i18n.global.t('utils.good morning!') + i18n.global.t('utils.welcome back')
      break
    }
    case (hour < 14): {
      greet = i18n.global.t('utils.good noon!') + i18n.global.t('utils.welcome back')
      break
    }
    case (hour < 18): {
      greet = i18n.global.t('utils.good afternoon!') + i18n.global.t('utils.welcome back')
      break
    }
    case (hour < 24): {
      greet = i18n.global.t('utils.good evening!') + i18n.global.t('utils.welcome back')
      break
    }
    default: {
      greet = i18n.global.t('utils.hello') + i18n.global.t('utils.welcome back')
      break
    }
  }

  return greet
}

export const formatSeconds = (seconds: number) => {
  let secondTime = 0 // 秒
  let minuteTime = 0 // 分
  let hourTime = 0 // 时
  let dayTime = 0 // 天
  let result = ''

  if (seconds < 60) {
    secondTime = seconds
  } else {
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = Math.floor(seconds / 60)
    // 获取秒数，秒数取余，得到整数秒数
    secondTime = Math.floor(seconds % 60)

    // 如果分钟大于60，将分钟除以60，得到整数小时
    hourTime = Math.floor(minuteTime / 60)

    // 获取小时后取余的分，获取分钟除以60取余的分
    minuteTime = Math.floor(minuteTime % 60)

    if (hourTime >= 24) {
      // 获取天数，获取小时除以24，得到整数天
      dayTime = Math.floor(hourTime / 24)
      // 获取小时后取余小时，获取分钟除以24取余的分
      hourTime = Math.floor(hourTime % 24)
    }
  }

  result = hourTime + i18n.global.t('dashboard.hour') + 
    (minuteTime >= 10 ? minuteTime : '0' + minuteTime) + i18n.global.t('dashboard.minute') +
    (secondTime >= 10 ? secondTime : '0' + secondTime) + i18n.global.t('dashboard.second')

  if (dayTime > 0) {
      result = dayTime + i18n.global.t('dashboard.day') + result
  }

  return result
}