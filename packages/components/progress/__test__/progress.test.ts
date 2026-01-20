import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import AmuProgress from '../src/progress.vue'
import { nextTick } from 'vue'

describe('Progress', () => {
  test('create', () => {
    const wrapper = mount(AmuProgress, {
      props: {
        percentage: 50
      }
    })
    expect(wrapper.props().percentage).toBe(50)
    expect(wrapper.find('.amu-progress-bar__inner').attributes('style')).toContain('width: 50%')
  })

  test('status', () => {
    const wrapper = mount(AmuProgress, {
      props: {
        percentage: 50,
        status: 'success'
      }
    })
    expect(wrapper.find('.amu-progress').classes()).toContain('is-success')
  })

  test('text inside', () => {
    const wrapper = mount(AmuProgress, {
      props: {
        percentage: 50,
        textInside: true,
        strokeWidth: 20
      }
    })
    expect(wrapper.find('.amu-progress').classes()).toContain('amu-progress--text-inside')
    expect(wrapper.find('.amu-progress-bar__innerText').text()).toBe('50%')
  })

  test('circle', () => {
    const wrapper = mount(AmuProgress, {
      props: {
        percentage: 50,
        type: 'circle'
      }
    })
    expect(wrapper.find('.amu-progress--circle').exists()).toBe(true)
  })

  test('dashboard', () => {
    const wrapper = mount(AmuProgress, {
      props: {
        percentage: 50,
        type: 'dashboard'
      }
    })
    expect(wrapper.find('.amu-progress--dashboard').exists()).toBe(true)
  })

  test('color function', () => {
    const wrapper = mount(AmuProgress, {
      props: {
        percentage: 50,
        color: (percentage: number) => {
          if (percentage < 30) return 'red'
          if (percentage < 70) return 'yellow'
          return 'green'
        }
      }
    })
    expect(wrapper.find('.amu-progress-bar__inner').attributes('style')).toContain('background-color: yellow')
  })

  test('color array', () => {
    const wrapper = mount(AmuProgress, {
      props: {
        percentage: 50,
        color: [
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#5cb87a', percentage: 60 },
          { color: '#1989fa', percentage: 80 }
        ]
      }
    })
    expect(wrapper.find('.amu-progress-bar__inner').attributes('style')).toContain('background-color: rgb(92, 184, 122)')
  })
})
