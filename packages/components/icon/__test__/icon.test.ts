import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Icon from '../src/icon.vue'

describe('Icon.vue', () => {
  it('should render correctly', () => {
    const wrapper = mount(Icon)
    expect(wrapper.classes()).toContain('amu-icon')
  })

  it('should render with size', () => {
    const wrapper = mount(Icon, {
      props: {
        size: 20,
      },
    })
    expect(wrapper.element.style.fontSize).toBe('20px')
  })

  it('should render with color', () => {
    const wrapper = mount(Icon, {
      props: {
        color: 'red',
      },
    })
    expect(wrapper.element.style.color).toBe('red')
  })

  it('should render with spin', () => {
    const wrapper = mount(Icon, {
      props: {
        spin: true,
      },
    })
    expect(wrapper.classes()).toContain('amu-icon--spin')
  })
})
