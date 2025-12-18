import { ref, computed } from 'vue'

export type Language = 'zh-CN' | 'en-US'

const currentLang = ref<Language>('zh-CN')

export function useLanguage() {
  const setLanguage = (lang: Language) => {
    currentLang.value = lang
    // Optionally save to localStorage
    localStorage.setItem('amu-docs-lang', lang)
  }

  const initLanguage = () => {
    const saved = localStorage.getItem('amu-docs-lang') as Language
    if (saved && (saved === 'zh-CN' || saved === 'en-US')) {
      currentLang.value = saved
    }
  }

  return {
    lang: computed(() => currentLang.value),
    setLanguage,
    initLanguage
  }
}
