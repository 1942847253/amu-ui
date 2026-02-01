import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { defineComponent } from 'vue'
import Descriptions from '../src/descriptions.vue'
import DescriptionsItem from '../src/descriptions-item.vue'

describe('Descriptions', () => {
  test('render basic', () => {
    const Wrapper = defineComponent({
      components: { Descriptions, DescriptionsItem },
      template: `
        <Descriptions title="User Info">
          <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
          <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
        </Descriptions>
      `
    })
    const wrapper = mount(Wrapper)
    
    expect(wrapper.classes()).toContain('amu-descriptions')
    expect(wrapper.find('.amu-descriptions__title').text()).toBe('User Info')
    expect(wrapper.findAll('.amu-descriptions__label').length).toBe(2)
    expect(wrapper.findAll('.amu-descriptions__content').length).toBe(2)
    expect(wrapper.find('.amu-descriptions__label').text()).toBe('UserName')
    expect(wrapper.find('.amu-descriptions__content').text()).toBe('Zhou Maomao')
  })

  test('render border', () => {
    const Wrapper = defineComponent({
      components: { Descriptions, DescriptionsItem },
      template: `
        <Descriptions border>
          <DescriptionsItem label="UserName" :span="2">Zhou Maomao</DescriptionsItem>
        </Descriptions>
      `
    })
    const wrapper = mount(Wrapper)
    expect(wrapper.find('.amu-descriptions').classes()).toContain('amu-descriptions--bordered')
    const td = wrapper.find('td')
    // 默认列数为 3，span=2 会补齐到 3，因此 td 的 colspan 为 5
    expect(td.attributes('colspan')).toBe('5')
  })
})
