import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { AmuDatePicker } from '../index'

describe('AmuDatePicker', () => {
  it('renders input', () => {
    const wrapper = mount(AmuDatePicker, { attachTo: document.body })
    expect(wrapper.find('input').exists()).toBe(true)
    wrapper.unmount()
  })

  it('opens panel on click', async () => {
    const wrapper = mount(AmuDatePicker, { attachTo: document.body })
    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')
    expect(document.body.querySelector('.amu-date-picker__panel')).toBeTruthy()
    wrapper.unmount()
  })

  it('selects date and emits update/modelValue', async () => {
    const wrapper = mount(AmuDatePicker, { attachTo: document.body })
    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')

    const firstCell = document.body.querySelector(
      '.amu-date-picker__panel .amu-date-picker__cell-btn:not([disabled])',
    ) as HTMLButtonElement

    expect(firstCell).toBeTruthy()
    firstCell.click()

    await wrapper.vm.$nextTick()

    const emits = wrapper.emitted('update:modelValue')
    expect(emits).toBeTruthy()
    expect(emits?.[0]?.[0]).toBeInstanceOf(Date)

    wrapper.unmount()
  })

  it('clearable clears value', async () => {
    const value = new Date('2025-12-24T00:00:00.000Z')
    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        modelValue: value,
        clearable: true,
      },
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('.amu-input__clear-btn').trigger('click')
    const emits = wrapper.emitted('update:modelValue')
    expect(emits?.[0]?.[0]).toBe(null)

    wrapper.unmount()
  })

  it('disabledDate prevents selecting date', async () => {
    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        disabledDate: () => true,
      },
    })
    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')

    await wrapper.vm.$nextTick()

    const enabledCell = document.body.querySelector(
      '.amu-date-picker__panel .amu-date-picker__cell-btn:not([disabled])',
    )

    expect(enabledCell).toBeFalsy()

    wrapper.unmount()
  })

  it('range selects start then end', async () => {
    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        type: 'daterange',
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')

    const cells = Array.from(
      document.body.querySelectorAll(
        '.amu-date-picker__panel .amu-date-picker__cell-btn:not([disabled])',
      ),
    ) as HTMLButtonElement[]

    expect(cells.length).toBeGreaterThan(2)

    cells[0].click()
    cells[1].click()

    await wrapper.vm.$nextTick()

    const emits = wrapper.emitted('update:modelValue')
    expect(emits).toBeTruthy()
    const val = emits?.[0]?.[0] as unknown
    expect(Array.isArray(val)).toBe(true)
    const range = val as unknown[]
    expect(range[0]).toBeInstanceOf(Date)
    expect(range[1]).toBeInstanceOf(Date)

    wrapper.unmount()
  })
})
