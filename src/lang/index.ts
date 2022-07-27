import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useConfigStore } from '@/stores/modules/config'
import antDesignZhcnlocale from 'ant-design-vue/es/locale/zh_CN';

var i18n

const assignLocale = {
  'zh-ch': [antDesignZhcnlocale]
}

export async function loadLang(app: App) {
  const config = useConfigStore()
  const locale = config.lang.defaultLang

  const lang = await import(`./global-${locale}.ts`)
  const message = lang.default ?? {}

  const messages = {
    [locale]: { ... message }
  }

  i18n = createI18n({
    locale,
    legacy: false,
    globalInjection: true,
    messages
  })
  app.use(i18n)
}