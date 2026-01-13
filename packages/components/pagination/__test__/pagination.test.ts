import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Pagination from '../src/pagination.vue'

describe('Pagination', () => {
  test('render', () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 50,
        pageSize: 10
      }
    })
    expect(wrapper.find('.amu-pagination').exists()).toBe(true)
    expect(wrapper.findAll('.amu-pagination__item').length).toBe(5)
  })

  test('click pager', async () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 50
      }
    })
    const pagers = wrapper.findAll('.amu-pagination__item')
    await pagers[1].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([2])
  })

  test('pageSize change', async () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 50,
        showSizeChanger: true,
        pageSizeOptions: [10, 20]
      }
    })
    // Simulate select change usually requires integration test or finding the internal component
    // Assuming AmuSelect emits change
    const select = wrapper.findComponent({ name: 'AmuSelect' })
    expect(select.exists()).toBe(true)
    select.vm.$emit('change', 20)
    expect(wrapper.emitted()).toHaveProperty('update:pageSize')
    expect(wrapper.emitted('update:pageSize')![0]).toEqual([20])
  })
  
  test('simple mode', () => {
     const wrapper = mount(Pagination, {
      props: {
        total: 50,
        simple: true
      }
    })
    expect(wrapper.find('.amu-pagination--simple').exists()).toBe(true)
  })
})
