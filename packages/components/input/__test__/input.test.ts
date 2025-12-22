import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { AmuInput } from '../index'

describe('AmuInput', () => {
  it('should render correctly', () => {
    const wrapper = mount(AmuInput, {
      props: {
        placeholder: 'test placeholder'
      }
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('test placeholder')
    expect(wrapper.classes()).toContain('amu-input-wrapper')
  })

  it('should handle v-model', async () => {
    const wrapper = mount(AmuInput, {
      props: {
        modelValue: 'initial'
      }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('initial')

    await input.setValue('updated')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['updated'])
  })

  it('should handle disabled', () => {
    const wrapper = mount(AmuInput, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
    expect(wrapper.classes()).toContain('amu-input--disabled')
  })

  it('should handle clearable', async () => {
    const wrapper = mount(AmuInput, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })
    // Simulate focus to show clear icon
    await wrapper.find('input').trigger('focus')
    
    const clearBtn = wrapper.find('.amu-input__clear-btn')
    expect(clearBtn.exists()).toBe(true)
    
    await clearBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('should handle variant', () => {
    const wrapper = mount(AmuInput, {
      props: {
        variant: 'filled'
      }
    })
    expect(wrapper.classes()).toContain('amu-input--filled')
    
    const wrapperOutline = mount(AmuInput, {
      props: {
        variant: 'outline'
      }
    })
    expect(wrapperOutline.classes()).toContain('amu-input--outline')
  })
})
