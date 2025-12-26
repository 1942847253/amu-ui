import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AmuSlider from '../src/slider.vue'

describe('AmuSlider', () => {
  it('should render correctly', () => {
    const wrapper = mount(AmuSlider, {
      props: {
        modelValue: 50
      }
    })
    expect(wrapper.find('.amu-slider').exists()).toBe(true)
    expect(wrapper.find('.amu-slider__bar').exists()).toBe(true)
    expect(wrapper.find('.amu-slider__thumb').exists()).toBe(true)
  })

  it('should support range mode', () => {
    const wrapper = mount(AmuSlider, {
      props: {
        modelValue: [20, 80],
        range: true
      }
    })
    expect(wrapper.findAll('.amu-slider__thumb').length).toBe(2)
  })

  it('should support disabled', () => {
    const wrapper = mount(AmuSlider, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('.amu-slider--disabled').exists()).toBe(true)
  })
})
