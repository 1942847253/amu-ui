import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { AmuInputNumber } from '../index'

describe('AmuInputNumber', () => {
  test('create', () => {
    const wrapper = mount(AmuInputNumber, {
      props: {
        modelValue: 1,
      },
    })
    expect(wrapper.classes()).toContain('amu-input-number')
    const input = wrapper.find('input')
    expect(input.element.value).toBe('1')
  })

  test('increase and decrease', async () => {
    const wrapper = mount(AmuInputNumber, {
      props: {
        modelValue: 1,
        step: 2,
        max: 10,
        min: 0
      },
    })
    const input = wrapper.find('input')
    const increaseBtn = wrapper.find('.amu-input-number__increase')
    const decreaseBtn = wrapper.find('.amu-input-number__decrease')

    await increaseBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([3])
    
    // Simulate updating prop
    await wrapper.setProps({ modelValue: 3 })
    await decreaseBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')![1]).toEqual([1])
  })

  test('precision', async () => {
    const wrapper = mount(AmuInputNumber, {
      props: {
        modelValue: 1,
        precision: 2,
        step: 0.1
      },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('1.00')
    
    const increaseBtn = wrapper.find('.amu-input-number__increase')
    await increaseBtn.trigger('click')
    // 1 + 0.1 = 1.1 -> 1.10
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([1.1]) // The value emitted is number
    // We can't check input value directly without waiting for prop update if standard v-model pattern
  })

  test('input limit', async () => {
      const wrapper = mount(AmuInputNumber, {
          props: {
              modelValue: 10,
              max: 10,
              min: 0
          }
      })
      const increaseBtn = wrapper.find('.amu-input-number__increase')
      // disabled style
      expect(increaseBtn.classes()).toContain('is-disabled')
      await increaseBtn.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
  
  test('keyboard operations', async () => {
      const wrapper = mount(AmuInputNumber, {
          props: { modelValue: 5 }
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowUp' })
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([6])
      
      await input.trigger('keydown', { key: 'ArrowDown' })
      expect(wrapper.emitted('update:modelValue')![1]).toEqual([4])
  })
  
  test('manual input', async () => {
      const wrapper = mount(AmuInputNumber, {
          props: { modelValue: 5, max: 10 }
      })
      const input = wrapper.find('input')
      input.element.value = '15'
      await input.trigger('input')
      await input.trigger('blur')
      
      // Should emit 10 (max)
      const emitted = wrapper.emitted('update:modelValue')
      const lastEmit = emitted![emitted!.length - 1]
      expect(lastEmit).toEqual([10])
  })
})
