import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { AmuCascader } from '../index'

const options = [
  {
    value: 'a',
    label: 'A',
    children: [
      { value: 'a-1', label: 'A-1' },
      { value: 'a-2', label: 'A-2' },
    ],
  },
  {
    value: 'b',
    label: 'B',
    children: [
      { value: 'b-1', label: 'B-1' },
    ],
  },
]

describe('AmuCascader', () => {
  test('create', async () => {
    const wrapper = mount(AmuCascader, {
      props: {
        modelValue: [],
        options,
        placeholder: '请选择',
      },
    })
    expect(wrapper.find('.amu-cascader__input input').attributes('placeholder')).toBe('请选择')
  })

  test('select option', async () => {
    const wrapper = mount(AmuCascader, {
      props: {
        modelValue: [],
        options,
      },
      attachTo: document.body,
      global: {
        stubs: { transition: false },
      },
    })

    await wrapper.find('.amu-cascader').trigger('click')
    const firstLevel = document.querySelectorAll('.amu-cascader__option')
    await (firstLevel[0] as HTMLElement).click()
    await wrapper.vm.$nextTick()

    const secondLevel = document.querySelectorAll('.amu-cascader__menu:nth-child(2) .amu-cascader__option')
    await (secondLevel[0] as HTMLElement).click()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'a-1']])
    wrapper.unmount()
  })

  test('clearable', async () => {
    const wrapper = mount(AmuCascader, {
      props: {
        modelValue: ['a', 'a-1'],
        options,
        clearable: true,
      },
      attachTo: document.body,
    })

    await wrapper.find('.amu-cascader').trigger('mouseenter')
    const clearIcon = wrapper.find('.amu-cascader__clear')
    await clearIcon.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
    wrapper.unmount()
  })

  test('multiple select', async () => {
    const wrapper = mount(AmuCascader, {
      props: {
        modelValue: [],
        options,
        multiple: true,
      },
      attachTo: document.body,
      global: {
        stubs: { transition: false },
      },
    })

    await wrapper.find('.amu-cascader').trigger('click')
    const firstLevel = document.querySelectorAll('.amu-cascader__option')
    await (firstLevel[0] as HTMLElement).click()
    const secondLevelA = document.querySelectorAll('.amu-cascader__menu:nth-child(2) .amu-cascader__option')
    await (secondLevelA[0] as HTMLElement).click()

    await (firstLevel[1] as HTMLElement).click()
    const secondLevelB = document.querySelectorAll('.amu-cascader__menu:nth-child(2) .amu-cascader__option')
    await (secondLevelB[0] as HTMLElement).click()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted?.[emitted.length - 1]).toEqual([[['a', 'a-1'], ['b', 'b-1']]])
    wrapper.unmount()
  })

  test('multiple parent-child linkage', async () => {
    const wrapper = mount(AmuCascader, {
      props: {
        modelValue: [],
        options,
        multiple: true,
        checkStrictly: false,
      },
      attachTo: document.body,
      global: {
        stubs: { transition: false },
      },
    })

    await wrapper.find('.amu-cascader').trigger('click')
    const firstLevel = document.querySelectorAll('.amu-cascader__option')
    await (firstLevel[0] as HTMLElement).click()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted?.[emitted.length - 1]).toEqual([[['a', 'a-1'], ['a', 'a-2']]])
    wrapper.unmount()
  })

  test('disabled', async () => {
    const wrapper = mount(AmuCascader, {
      props: {
        modelValue: [],
        options,
        disabled: true,
      },
    })

    await wrapper.find('.amu-cascader').trigger('click')
    expect(wrapper.find('.amu-cascader__popper').exists()).toBe(false)
  })
})
