import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import Scrollbar from '../src/scrollbar.vue'

describe('Scrollbar', () => {
  test('render', async () => {
    const wrapper = mount(Scrollbar, {
      props: {
        height: '200px',
      },
      slots: {
        default: '<div style="height: 400px;"></div>',
      },
    })

    expect(wrapper.find('.amu-scrollbar').exists()).toBe(true)
    expect(wrapper.find('.amu-scrollbar__wrap').exists()).toBe(true)
    expect(wrapper.find('.amu-scrollbar__view').exists()).toBe(true)
    expect(wrapper.find('.amu-scrollbar').attributes('style')).toContain(
      'height: 200px'
    )
  })

  test('max-height', async () => {
    const wrapper = mount(Scrollbar, {
      props: {
        maxHeight: '200px',
      },
      slots: {
        default: '<div style="height: 400px;"></div>',
      },
    })

    expect(wrapper.find('.amu-scrollbar__wrap').attributes('style')).toContain(
      'max-height: 200px'
    )
  })

  test('native', async () => {
    const wrapper = mount(Scrollbar, {
      props: {
        native: true,
        height: '200px',
      },
      slots: {
        default: '<div style="height: 400px;"></div>',
      },
    })

    expect(wrapper.find('.amu-scrollbar__bar').exists()).toBe(false)
    expect(
      wrapper.find('.amu-scrollbar__wrap').classes()
    ).not.toContain('amu-scrollbar__wrap--hidden-default')
  })

  test('tag', async () => {
    const wrapper = mount(Scrollbar, {
      props: {
        tag: 'ul',
      },
    })

    expect(wrapper.find('ul.amu-scrollbar__view').exists()).toBe(true)
  })
})
