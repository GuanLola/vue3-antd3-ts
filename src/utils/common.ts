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