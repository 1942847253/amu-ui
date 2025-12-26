import { computed, inject, unref, ref, type Ref } from 'vue'
import { zhCn } from '@amu-ui/locale'
import type { Language } from '@amu-ui/locale'

export const localeContextKey = Symbol('localeContextKey')

export const useLocale = (localeOverrides?: Ref<Language | undefined>) => {
  const locale = localeOverrides || inject(localeContextKey, ref(zhCn))
  
  return buildLocaleContext(computed(() => locale.value || zhCn))
}

export const buildLocaleContext = (locale: Ref<Language>) => {
  const lang = computed(() => unref(locale).name)
  
  const t = (path: string) => {
    return get(unref(locale), path, path)
  }
  
  return {
    lang,
    locale,
    t,
  }
}

// Simple get implementation to avoid lodash dependency
function get(object: any, path: string, defaultValue?: any) {
  const paths = path.split('.')
  let result = object
  for (const p of paths) {
    result = result?.[p]
  }
  return result === undefined ? defaultValue : result
}


