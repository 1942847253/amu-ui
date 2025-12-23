import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Switch from '../src/switch.vue'

describe('Switch', () => {
  test('create', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.classes()).toContain('amu-switch')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    expect(wrapper.emitted('change')![0]).toEqual([true])
  })

  test('disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('loading', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        loading: true
      }
    })
    expect(wrapper.classes()).toContain('is-loading')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('beforeChange resolve', async () => {
    const beforeChange = vi.fn(() => Promise.resolve(true))
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        beforeChange
      }
    })
    await wrapper.trigger('click')
    expect(beforeChange).toHaveBeenCalled()
    // Wait for promise
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  test('beforeChange reject', async () => {
    const beforeChange = vi.fn(() => Promise.reject())
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        beforeChange
      }
    })
    await wrapper.trigger('click')
    expect(beforeChange).toHaveBeenCalled()
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('text', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        checkedText: 'ON',
        uncheckedText: 'OFF'
      }
    })
    expect(wrapper.text()).toContain('ON')
    expect(wrapper.text()).not.toContain('OFF')
  })
})
