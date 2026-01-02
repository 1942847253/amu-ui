import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Dialog from '../src/dialog.vue'

describe('Dialog', () => {
  it('should render correctly', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        title: 'Test Dialog',
        description: 'Test Content'
      },
      global: {
        stubs: {
          teleport: true,
          transition: true,
          AmuIcon: true
        }
      }
    })
    
    expect(wrapper.find('.amu-dialog').exists()).toBe(true)
    expect(wrapper.find('.amu-dialog-title').text()).toContain('Test Dialog')
    expect(wrapper.find('.amu-dialog-body-content').text()).toContain('Test Content')
  })

  it('should emit update:modelValue when close button clicked', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      global: {
        stubs: {
          teleport: true,
          transition: true,
          AmuIcon: true
        }
      }
    })
    
    await wrapper.find('.amu-dialog-close').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })
})
