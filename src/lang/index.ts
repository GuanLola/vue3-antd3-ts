import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useConfigStore } from '@/stores/modules/config'
import antDesignZhcnlocale from 'ant-design-vue/es/locale/zh_CN';
import antDesignEnlocale from 'ant-design-vue/es/locale/en_US';

import type { I18n } from 'vue-i18n'

export var i18n: I18n<{ [x: string]: any }, unknown, unknown, false>

interface IassignLocale {
  [key: string]: any
}

const assignLocale: IassignLocale = {
  'zh-cn': [antDesignZhcnlocale],
  en: [antDesignEnlocale]
}

export async function loadLang(app: App) {
  const config = useConfigStore()
  const locale = config.lang.defaultLang

  const lang = await import(`./global-${locale}.ts`)
  const message = lang.default ?? {}
  
  console.log('>>>', locale)

  if (locale == 'zh-cn') {
    assignLocale[locale].push(getLangFileMessage(import.meta.globEager('./pages/zh-cn/**/*.ts'), locale))
  } else if (locale == 'en') {
    assignLocale[locale].push(getLangFileMessage(import.meta.globEager('./pages/en/**/*.ts'), locale))
  }

  const messages = {
    [locale]: { ... message }
  }

  // 合并语言包(含element-puls、页面语言包)
  Object.assign(messages[locale], ...assignLocale[locale])

  console.log(messages)

  i18n = createI18n({
    locale,
    legacy: false,
    globalInjection: true,
    messages
  })

  console.log('i18n', i18n)

  app.use(i18n)
  return i18n
}

function getLangFileMessage(mList: any, locale: string) {
  interface Imsg {
      [key: string]: any
  }
  let msg: Imsg = {}
  locale = '/' + locale
  for (let path in mList) {
      if (mList[path].default) {
          //  获取文件名
          let pathName = path.slice(path.lastIndexOf(locale) + (locale.length + 1), path.lastIndexOf('.'))
          if (pathName.indexOf('/') > 0) {
              let pathNameTmp = pathName.split('/')
              if (pathNameTmp.length == 2) {
                  if (msg[pathNameTmp[0]] === undefined) msg[pathNameTmp[0]] = []
                  msg[pathNameTmp[0]][pathNameTmp[1]] = handleMsglist(mList[path].default)
              } else if (pathNameTmp.length == 3) {
                  if (msg[pathNameTmp[0]] === undefined) msg[pathNameTmp[0]] = []
                  if (msg[pathNameTmp[0]][pathNameTmp[1]] === undefined) msg[pathNameTmp[0]][pathNameTmp[1]] = []
                  msg[pathNameTmp[0]][pathNameTmp[1]][pathNameTmp[2]] = handleMsglist(mList[path].default)
              } else {
                  msg[pathName] = handleMsglist(mList[path].default)
              }
          } else {
              msg[pathName] = handleMsglist(mList[path].default)
          }
      }
  }
  return msg
}

function handleMsglist(mlist: any) {
  let newMlist: any = []
  for (const key in mlist) {
      if (key.indexOf('.') > 0) {
          let keyTmp = key.split('.')
          if (typeof newMlist[keyTmp[0]] === 'undefined') {
              newMlist[keyTmp[0]] = []
          } else {
              newMlist[keyTmp[0]][keyTmp[1]] = mlist[key]
          }
      } else {
          newMlist[key] = mlist[key]
      }
  }
  return newMlist
}

export function editDefaultLang(lang: string): void {
  const config = useConfigStore()
  config.setLang(lang)

  location.reload()
}