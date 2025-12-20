import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tag from '../src/tag.vue'

describe('Tag', () => {
  test('create', () => {
    const wrapper = mount(Tag, {
      slots: {
        default: 'Tag Content'
      }
    })
    expect(wrapper.text()).toBe('Tag Content')
    expect(wrapper.classes()).toContain('amu-tag')
  })

  test('type', () => {
    const wrapper = mount(Tag, {
      props: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('amu-tag--primary')
  })

  test('closable', async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true
      }
    })
    const closeBtn = wrapper.find('.amu-tag__close')
    expect(closeBtn.exists()).toBe(true)
    
    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  test('disabled', async () => {
    const wrapper = mount(Tag, {
      props: {
        disabled: true,
        closable: true
      }
    })
    expect(wrapper.classes()).toContain('amu-tag--disabled')
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()

    const closeBtn = wrapper.find('.amu-tag__close')
    await closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toBeUndefined()
  })
})
