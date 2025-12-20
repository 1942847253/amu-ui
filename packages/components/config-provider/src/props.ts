import type { PropType } from 'vue'
import type { Language } from '@amu-ui/locale'

export const configProviderProps = {
  /**
   * 语言包配置
   * @en Language package configuration
   */
  locale: {
    type: Object as PropType<Language>,
  }
} as const

export const configProviderSlots = {
  /**
   * 默认插槽
   * @en Default slot
   */
  default: {}
}
