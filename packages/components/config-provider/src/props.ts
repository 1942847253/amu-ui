import type { PropType } from 'vue'
import type { Language } from '@amu-ui/locale'

export const configProviderProps = {
  locale: {
    type: Object as PropType<Language>,
  }
} as const
