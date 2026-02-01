import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { AmuEmpty } from '../index'

describe('Empty.vue', () => {
  test('render default', () => {
    const wrapper = mount(AmuEmpty)
    expect(wrapper.classes()).toContain('amu-empty')
    expect(wrapper.find('.amu-empty__image').exists()).toBe(true)
    expect(wrapper.find('.amu-empty__description').text()).toBe('暂无数据')
  })

  test('render with description', () => {
    const wrapper = mount(AmuEmpty, {
      props: {
        description: 'No Data Custom',
      },
    })
    expect(wrapper.find('.amu-empty__description').text()).toBe('No Data Custom')
  })

  test('render with image', () => {
    const wrapper = mount(AmuEmpty, {
      props: {
        image: 'https://example.com/empty.png',
      },
    })
    const img = wrapper.find('.amu-empty__image img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/empty.png')
  })

  test('render with imageSize', () => {
    const wrapper = mount(AmuEmpty, {
      props: {
        imageSize: 200,
      },
    })
    const imageContainer = wrapper.find('.amu-empty__image')
    expect(imageContainer.attributes('style')).toContain('width: 200px;')
  })

  test('slots', () => {
    const wrapper = mount(AmuEmpty, {
      slots: {
        default: '<button>Button</button>',
        image: '<div class="custom-image">IMG</div>',
        description: '<div class="custom-desc">DESC</div>',
      },
    })
    expect(wrapper.find('.custom-image').exists()).toBe(true)
    expect(wrapper.find('.custom-desc').exists()).toBe(true)
    expect(wrapper.find('.amu-empty__bottom button').text()).toBe('Button')
  })
})
