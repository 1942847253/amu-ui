import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from '../src/button.vue'

describe('AmuButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Hello'
      }
    })

    expect(wrapper.text()).toContain('Hello')
  })

  it('applies type class', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      }
    })

    expect(wrapper.classes()).toContain('amu-button')
    expect(wrapper.classes()).toContain('amu-button--primary')
  })

  it('supports disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
  })

  it('applies size class', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'small'
      }
    })

    expect(wrapper.classes()).toContain('amu-button--size-small')
  })

  it('applies status class', () => {
    const wrapper = mount(Button, {
      props: {
        status: 'success'
      }
    })

    expect(wrapper.classes()).toContain('amu-button--status-success')
  })

  it('renders spinner and disables clicks when loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })

    const button = wrapper.get('button')
    expect(wrapper.classes()).toContain('amu-button--loading')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('.amu-button__spinner').exists()).toBe(true)
  })

  it('supports fill mode', () => {
    const wrapper = mount(Button, {
      props: {
        fill: true
      }
    })

    expect(wrapper.classes()).toContain('amu-button--fill')
  })

  it('supports htmlType', () => {
    const wrapper = mount(Button, {
      props: {
        htmlType: 'submit'
      }
    })

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('renders icon slot', () => {
    const wrapper = mount(Button, {
      slots: {
        icon: '<span class="icon">Icon</span>'
      }
    })

    expect(wrapper.find('.amu-button__icon').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
