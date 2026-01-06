import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Drawer from '../src/drawer.vue'
import { nextTick } from 'vue'

describe('Drawer', () => {
  it('should render correctly', async () => {
    const wrapper = mount(Drawer, {
      props: {
        modelValue: true,
        title: 'Test Drawer',
      },
      slots: {
        default: 'Drawer Content'
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    })
    
    expect(wrapper.find('.amu-drawer').exists()).toBe(true)
    expect(wrapper.find('.amu-drawer__title').text()).toContain('Test Drawer')
    expect(wrapper.find('.amu-drawer__body').text()).toContain('Drawer Content')
  })

  it('should toggle visibility', async () => {
    const wrapper = mount(Drawer, {
      props: {
        modelValue: false,
      },
      global: {
        stubs: { Teleport: true, Transition: true }
      }
    })

    expect(wrapper.find('.amu-drawer').isVisible()).toBe(false)

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.find('.amu-drawer').isVisible()).toBe(true)
  })

  it('should emit close events', async () => {
    const wrapper = mount(Drawer, {
      props: {
        modelValue: true,
      },
      global: {
        stubs: { Teleport: true, Transition: true }
      }
    })

    await wrapper.find('.amu-drawer__close').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('should render footer slot', () => {
     const wrapper = mount(Drawer, {
      props: { modelValue: true },
      slots: {
        footer: 'Footer Content'
      },
      global: { stubs: { Teleport: true, Transition: true } }
    })
    expect(wrapper.find('.amu-drawer__footer').text()).toContain('Footer Content')
  })
})
