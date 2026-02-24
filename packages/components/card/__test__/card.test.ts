import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { AmuCard } from '../index'

describe('AmuCard', () => {
  test('should render properly', () => {
    const wrapper = mount(AmuCard, {
      slots: {
        default: 'Card Content',
      },
    })
    expect(wrapper.classes()).toContain('amu-card')
    expect(wrapper.text()).toContain('Card Content')
  })

  test('should render title', () => {
    const wrapper = mount(AmuCard, {
      props: {
        title: 'Card Title',
      },
    })
    expect(wrapper.find('.amu-card__title').text()).toBe('Card Title')
  })

  test('toggle collapse', async () => {
    const wrapper = mount(AmuCard, {
      props: {
        title: 'Title',
        collapsible: true,
      },
    })
    
    // Default open
    expect(wrapper.find('.amu-card__body').isVisible()).toBe(true)

    // Click collapse button
    const btn = wrapper.find('.amu-card__tool-btn')
    expect(btn.exists()).toBe(true)
    await btn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([true])
    expect(wrapper.classes()).toContain('amu-card--collapsed')
  })
})
