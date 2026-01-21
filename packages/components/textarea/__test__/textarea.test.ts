import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import Textarea from '../src/textarea.vue'

describe('Textarea', () => {
  test('create', () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: 'test',
        placeholder: 'placeholder'
      }
    })
    
    expect(wrapper.find('textarea').element.value).toBe('test')
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('placeholder')
    expect(wrapper.classes()).toContain('amu-textarea-wrapper')
  })

  test('v-model', async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: ''
      }
    })
    
    await wrapper.find('textarea').setValue('hello')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello'])
  })

  test('disabled', () => {
    const wrapper = mount(Textarea, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('amu-textarea--disabled')
  })

  test('maxlength', async () => {
    const wrapper = mount(Textarea, {
      props: {
        maxlength: 10,
        showWordLimit: true,
        modelValue: '123'
      }
    })
    
    expect(wrapper.find('.amu-textarea__word-limit').text()).toBe('3/10')
    expect(wrapper.find('textarea').attributes('maxlength')).toBe('10')
  })
})
