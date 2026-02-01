import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tooltip from '../src/tooltip.vue'

describe('Tooltip', () => {
  test('render reference and content', () => {
    const wrapper = mount(Tooltip, {
      props: {
        modelValue: true,
        content: '提示内容',
      },
      slots: {
        reference: '<button>触发</button>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    expect(wrapper.find('.amu-popup-reference').exists()).toBe(true)
    expect(wrapper.find('.amu-popup-reference').text()).toBe('触发')
    expect(wrapper.find('.amu-tooltip__content').text()).toBe('提示内容')
  })
})
