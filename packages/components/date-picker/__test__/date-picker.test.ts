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
        showTime: true,
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')

    const cells = Array.from(
      document.body.querySelectorAll(
        '.amu-date-picker__panel .amu-date-picker__cell:not(.amu-date-picker__cell--outside) .amu-date-picker__cell-btn:not([disabled])',
      ),
    ) as HTMLButtonElement[]

    expect(cells.length).toBeGreaterThan(10)

    cells[0].click()
    cells[10].click()

    await wrapper.vm.$nextTick()

    const inRangeCells = document.body.querySelectorAll('.amu-date-picker__panel .amu-date-picker__cell--in-range')
    expect(inRangeCells.length).toBeGreaterThan(0)

    wrapper.unmount()
  })

  it('range hover previews end selection', async () => {
    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        type: 'daterange',
        showTime: true,
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')

    const startBtn = document.body.querySelector(
      '.amu-date-picker__panel .amu-date-picker__cell:not(.amu-date-picker__cell--outside) .amu-date-picker__cell-btn:not([disabled])',
    ) as HTMLButtonElement | null

    expect(startBtn).toBeTruthy()
    startBtn!.click()
    await wrapper.vm.$nextTick()

    const hoverCellBtn = document.body.querySelectorAll(
      '.amu-date-picker__panel .amu-date-picker__cell:not(.amu-date-picker__cell--outside) .amu-date-picker__cell-btn:not([disabled])',
    )[10] as HTMLButtonElement | undefined

    expect(hoverCellBtn).toBeTruthy()

    const hoverCell = hoverCellBtn!.closest('.amu-date-picker__cell') as HTMLElement | null
    expect(hoverCell).toBeTruthy()

    hoverCellBtn!.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    await wrapper.vm.$nextTick()

    const hoveredCellLatest = document.body.querySelector(
      `.amu-date-picker__panel [data-date="${hoverCellBtn!.getAttribute('data-date')}"]`,
    )?.closest('.amu-date-picker__cell') as HTMLElement | null

    expect(hoveredCellLatest).toBeTruthy()
    expect(hoveredCellLatest!.classList.contains('amu-date-picker__cell--range-end')).toBe(true)
    expect(hoveredCellLatest!.classList.contains('amu-date-picker__cell--selected')).toBe(true)

    const inRangeCells = document.body.querySelectorAll('.amu-date-picker__panel .amu-date-picker__cell--in-range')
    expect(inRangeCells.length).toBeGreaterThan(0)

    wrapper.unmount()
  })

  it('range hover previews on outside day', async () => {
    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        type: 'daterange',
        showTime: true,
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')

    const startBtn = document.body.querySelector(
      '.amu-date-picker__panel .amu-date-picker__cell:not(.amu-date-picker__cell--outside) .amu-date-picker__cell-btn:not([disabled])',
    ) as HTMLButtonElement | null

    expect(startBtn).toBeTruthy()
    startBtn!.click()
    await wrapper.vm.$nextTick()

    const calendars = document.body.querySelectorAll('.amu-date-picker__panel .amu-date-picker__calendar')
    expect(calendars.length).toBe(2)

    const rightCalendar = calendars[1] as HTMLElement

    const outsideBtns = Array.from(
      rightCalendar.querySelectorAll(
        '.amu-date-picker__cell.amu-date-picker__cell--outside .amu-date-picker__cell-btn:not([disabled])',
      ),
    ) as HTMLButtonElement[]

    expect(outsideBtns.length).toBeGreaterThan(0)
    const hoverBtn = outsideBtns[outsideBtns.length - 1]
    const hoverKey = hoverBtn.getAttribute('data-date')
    expect(hoverKey).toBeTruthy()

    hoverBtn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    await wrapper.vm.$nextTick()

    const hoveredCellLatest = document.body.querySelector(
      `.amu-date-picker__panel [data-date="${hoverKey}"]`,
    )?.closest('.amu-date-picker__cell') as HTMLElement | null

    expect(hoveredCellLatest).toBeTruthy()
    expect(hoveredCellLatest!.classList.contains('amu-date-picker__cell--range-end')).toBe(true)
    expect(hoveredCellLatest!.classList.contains('amu-date-picker__cell--selected')).toBe(true)

    wrapper.unmount()
  })

  it('range hover previews even when range is already selected', async () => {
    const start = new Date('2026-01-06T00:00:00.000Z')
    const end = new Date('2026-02-24T00:00:00.000Z')

    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        type: 'daterange',
        modelValue: [start, end],
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')
    await wrapper.vm.$nextTick()

    const btns = Array.from(
      document.body.querySelectorAll(
        '.amu-date-picker__panel .amu-date-picker__cell .amu-date-picker__cell-btn:not([disabled])',
      ),
    ) as HTMLButtonElement[]

    expect(btns.length).toBeGreaterThan(10)

    const hoverBtn = btns[btns.length - 1]
    const hoverKey = hoverBtn.getAttribute('data-date')
    expect(hoverKey).toBeTruthy()

    hoverBtn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    await wrapper.vm.$nextTick()

    const hoveredCellLatest = document.body.querySelector(
      `.amu-date-picker__panel [data-date="${hoverKey}"]`,
    )?.closest('.amu-date-picker__cell') as HTMLElement | null

    expect(hoveredCellLatest).toBeTruthy()
    expect(hoveredCellLatest!.classList.contains('amu-date-picker__cell--range-end')).toBe(true)
    expect(hoveredCellLatest!.classList.contains('amu-date-picker__cell--selected')).toBe(true)

    wrapper.unmount()
  })

  it('range keeps start when extending end after selection', async () => {
    const start = new Date(2026, 6, 6)
    const end = new Date(2026, 7, 24)
    const nextEnd = new Date(2026, 7, 26)

    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        type: 'daterange',
        showTime: true,
        modelValue: [start, end],
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')
    await wrapper.vm.$nextTick()

    const endBtn = document.body.querySelector(
      '.amu-date-picker__panel [data-date="2026-08-24"]',
    ) as HTMLButtonElement | null
    expect(endBtn).toBeTruthy()
    endBtn!.click()
    await wrapper.vm.$nextTick()

    const nextEndBtn = document.body.querySelector(
      '.amu-date-picker__panel [data-date="2026-08-26"]',
    ) as HTMLButtonElement | null
    expect(nextEndBtn).toBeTruthy()
    nextEndBtn!.click()
    await wrapper.vm.$nextTick()

    const confirmBtn = document.body.querySelector(
      '.amu-date-picker__panel .amu-date-picker__time-right .amu-date-picker__btn',
    ) as HTMLButtonElement | null
    expect(confirmBtn).toBeTruthy()
    confirmBtn!.click()
    await wrapper.vm.$nextTick()

    const emits = wrapper.emitted('update:modelValue')
    expect(emits).toBeTruthy()
    const last = emits![emits!.length - 1]![0] as [Date, Date]

    const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    expect(ymd(last[0])).toBe(ymd(start))
    expect(ymd(last[1])).toBe(ymd(nextEnd))

    wrapper.unmount()
  })

  it('clicking next-month day switches panel month', async () => {
    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        type: 'daterange',
        showTime: true,
        modelValue: [new Date(2025, 11, 4), new Date(2026, 0, 15)],
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')
    await wrapper.vm.$nextTick()

    // 初始视图应为 2025-12 / 2026-01，此时 2026-02-04 会作为右侧面板的 outside 日期出现
    const nextMonthBtn = document.body.querySelector(
      '.amu-date-picker__panel [data-date="2026-02-04"]',
    ) as HTMLButtonElement | null
    expect(nextMonthBtn).toBeTruthy()

    nextMonthBtn!.click()
    await wrapper.vm.$nextTick()

    // 视图切换到 2026-01 / 2026-02 后，2026-02-04 应变为右侧面板的“非 outside”日期
    const calendarsAfter = document.body.querySelectorAll('.amu-date-picker__panel .amu-date-picker__calendar')
    expect(calendarsAfter.length).toBe(2)

    const rightCalendarAfter = calendarsAfter[1] as HTMLElement
    const cell = rightCalendarAfter
      .querySelector('[data-date="2026-02-04"]')
      ?.closest('.amu-date-picker__cell') as HTMLElement | null

    expect(cell).toBeTruthy()
    expect(cell!.classList.contains('amu-date-picker__cell--outside')).toBe(false)

    wrapper.unmount()
  })

  it('opening panel aligns right month to end when range spans months', async () => {
    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        type: 'daterange',
        showTime: true,
        modelValue: [new Date(2025, 11, 4), new Date(2026, 1, 4)],
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')
    await wrapper.vm.$nextTick()

    const calendars = document.body.querySelectorAll('.amu-date-picker__panel .amu-date-picker__calendar')
    expect(calendars.length).toBe(2)

    const rightCalendar = calendars[1] as HTMLElement
    const cell = rightCalendar.querySelector('[data-date="2026-02-04"]')?.closest('.amu-date-picker__cell') as
      | HTMLElement
      | null

    expect(cell).toBeTruthy()
    expect(cell!.classList.contains('amu-date-picker__cell--outside')).toBe(false)

    wrapper.unmount()
  })

  it('showTime renders time bar with AmuSelect', async () => {
    const wrapper = mount(AmuDatePicker, {
      attachTo: document.body,
      props: {
        showTime: true,
      },
    })

    await wrapper.find('.amu-date-picker__trigger').trigger('mousedown')
    await wrapper.vm.$nextTick()

    const panel = document.body.querySelector('.amu-date-picker__panel') as HTMLElement | null
    expect(panel).toBeTruthy()

    const timeBar = panel!.querySelector('.amu-date-picker__time-bar')
    expect(timeBar).toBeTruthy()
    expect(timeBar!.querySelectorAll('.amu-select').length).toBe(3)
    expect(timeBar!.querySelectorAll('.amu-date-picker__btn').length).toBe(2)
    expect(timeBar!.querySelector('select')).toBeFalsy()

    const footer = panel!.querySelector('.amu-date-picker__footer')
    expect(footer).toBeFalsy()

    wrapper.unmount()
  })
})
