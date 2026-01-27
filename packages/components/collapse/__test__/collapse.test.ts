import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AmuCollapse, AmuCollapseItem } from '../index'

describe('Collapse', () => {
  test('create', async () => {
    const wrapper = mount(AmuCollapse, {
      props: {
        modelValue: ['1'],
      },
      slots: {
        default: `
          <AmuCollapseItem name="1" title="title1">content1</AmuCollapseItem>
          <AmuCollapseItem name="2" title="title2">content2</AmuCollapseItem>
        `,
      },
      global: {
        components: {
          AmuCollapseItem,
        },
      },
    })

    expect(wrapper.find('.amu-collapse-item__header').text()).toBe('title1')
    expect(wrapper.find('.amu-collapse-item__content').text()).toBe('content1')
    expect(wrapper.find('.amu-collapse-item__wrap').isVisible()).toBe(true)
  })

  test('accordion', async () => {
    const wrapper = mount(AmuCollapse, {
      props: {
        modelValue: '1',
        accordion: true,
      },
      slots: {
        default: `
          <AmuCollapseItem name="1" title="title1">content1</AmuCollapseItem>
          <AmuCollapseItem name="2" title="title2">content2</AmuCollapseItem>
        `,
      },
      global: {
        components: {
          AmuCollapseItem,
        },
      },
    })

    const headers = wrapper.findAll('.amu-collapse-item__header')
    await headers[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2'])
  })

  test('click', async () => {
    const wrapper = mount(AmuCollapse, {
      props: {
        modelValue: [],
      },
      slots: {
        default: `
          <AmuCollapseItem name="1" title="title1">content1</AmuCollapseItem>
        `,
      },
      global: {
        components: {
          AmuCollapseItem,
        },
      },
    })

    await wrapper.find('.amu-collapse-item__header').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['1']])
  })
})
