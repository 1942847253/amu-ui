import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AmuSelect, AmuOption } from '../index'

describe('AmuSelect', () => {
  test('create', async () => {
    const wrapper = mount(AmuSelect, {
      props: {
        modelValue: '',
        placeholder: 'test placeholder',
      },
    })
    expect(wrapper.find('.amu-select__input').attributes('placeholder')).toBe('test placeholder')
  })

  test('options render', async () => {
    const wrapper = mount(AmuSelect, {
      props: {
        modelValue: '',
      },
      slots: {
        default: `
          <amu-option value="1" label="Option 1" />
          <amu-option value="2" label="Option 2" />
        `,
      },
      global: {
        components: { AmuOption },
        stubs: { transition: false },
      },
      attachTo: document.body, // Attach to body to ensure teleport works within same doc context
    })
    
    await wrapper.trigger('click')
    const options = document.querySelectorAll('.amu-option')
    expect(options.length).toBe(2)
    wrapper.unmount()
  })

  test('select option', async () => {
    const wrapper = mount(AmuSelect, {
      props: {
        modelValue: '',
      },
      slots: {
        default: `
          <amu-option value="1" label="Option 1" />
          <amu-option value="2" label="Option 2" />
        `,
      },
      global: {
        components: { AmuOption },
        stubs: { transition: false },
      },
      attachTo: document.body,
    })

    await wrapper.trigger('click')
    const options = document.querySelectorAll('.amu-option')
    // We need to trigger click on the DOM element
    await (options[0] as HTMLElement).click()
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    wrapper.unmount()
  })

  test('disabled', async () => {
    const wrapper = mount(AmuSelect, {
      props: {
        modelValue: '',
        disabled: true,
      },
    })
    
    await wrapper.trigger('click')
    expect(wrapper.find('.amu-select__popper').exists()).toBe(false)
  })
})
