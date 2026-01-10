import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { AmuRate } from '../index'

describe('AmuRate', () => {
  test('create', () => {
    const wrapper = mount(AmuRate, {
      props: {
        modelValue: 3,
        max: 5
      }
    })
    const items = wrapper.findAll('.amu-rate__item')
    expect(items.length).toBe(5)
    // 3 active stars (width 100%)
    const activeItems = wrapper.findAll('.amu-rate__decimal')
    // Active decimal block style width
    // Actually the logic is: item 1, 2, 3 have width 100%. Item 4, 5 check width 0%.
    // But .amu-rate__decimal is only rendered if showDecimalIcon(item) is true.
    // showDecimalIcon: showWhenActive: item - 1 < displayValue.
    // displayValue = 3. 
    // item 1: 0 < 3. True.
    // item 2: 1 < 3. True.
    // item 3: 2 < 3. True.
    // item 4: 3 < 3. False.
    // expect(wrapper.findAll('.amu-rate__decimal').length).toBe(3) -> Now always 5
    const decimals = wrapper.findAll('.amu-rate__decimal')
    expect(decimals.length).toBe(5)
    expect(decimals[0].attributes('style')).toContain('width: 100%')
    expect(decimals[2].attributes('style')).toContain('width: 100%')
    expect(decimals[3].attributes('style')).toContain('width: 0%')
  })

  test('change value', async () => {
    const wrapper = mount(AmuRate, {
      props: {
        modelValue: 0
      }
    })
    const items = wrapper.findAll('.amu-rate__item')
    await items[2].trigger('click') // Click 3rd star
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([3])
  })

  test('allow half', async () => {
      // Hard to simulate half click in JSDOM because trigger click options like clientX depend on layout.
      // But we can test prop passing mostly.
      const wrapper = mount(AmuRate, {
          props: {
              modelValue: 2.5,
              allowHalf: true
          }
      })
      const decimals = wrapper.findAll('.amu-rate__decimal')
      // item 1, 2, 3 should have width > 0.
      // item 3 width should be 50%.
      expect(decimals.length).toBe(5)
      expect(decimals[2].attributes('style')).toContain('width: 50%')
  })
  
  test('readonly', async () => {
      const wrapper = mount(AmuRate, {
          props: {
              modelValue: 2,
              readonly: true
          }
      })
      await wrapper.findAll('.amu-rate__item')[4].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
  
  test('show text', () => {
       const wrapper = mount(AmuRate, {
          props: {
              modelValue: 3,
              showText: true,
              texts: ['A', 'B', 'C', 'D', 'E']
          }
      })
      expect(wrapper.find('.amu-rate__text').text()).toBe('C')
  })
})
