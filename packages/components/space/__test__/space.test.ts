import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Space from '../src/space.vue'

describe('Space', () => {
  test('render', () => {
    const wrapper = mount(Space, {
      slots: {
        default: '<div>test</div>',
      },
    })
    expect(wrapper.classes()).toContain('amu-space')
    expect(wrapper.text()).toBe('test')
  })

  test('direction', () => {
    const wrapper = mount(Space, {
      props: {
        direction: 'vertical',
      },
    })
    expect(wrapper.classes()).toContain('amu-space--vertical')
  })

  test('size', () => {
    const wrapper = mount(Space, {
      props: {
        size: 'large',
      },
    })
    expect(wrapper.attributes('style')).toContain('gap: 16px')
  })

  test('custom size', () => {
    const wrapper = mount(Space, {
      props: {
        size: 20,
      },
    })
    expect(wrapper.attributes('style')).toContain('gap: 20px')
  })

  test('wrap', () => {
    const wrapper = mount(Space, {
      props: {
        wrap: true,
      },
    })
    expect(wrapper.attributes('style')).toContain('flex-wrap: wrap')
  })
})
