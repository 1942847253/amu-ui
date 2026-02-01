import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { AmuSwiper, AmuSwiperItem } from '../index'

const createWrapper = (props: Record<string, any> = {}) => {
  return mount({
    components: { AmuSwiper, AmuSwiperItem },
    template: `
      <amu-swiper v-bind="props">
        <amu-swiper-item>第一页</amu-swiper-item>
        <amu-swiper-item>第二页</amu-swiper-item>
        <amu-swiper-item>第三页</amu-swiper-item>
      </amu-swiper>
    `,
    data() {
      return { props }
    }
  })
}

describe('Swiper.vue', () => {
  test('render indicators', () => {
    const wrapper = createWrapper()
    const indicators = wrapper.findAll('.amu-swiper__indicator')
    expect(indicators.length).toBe(3)
  })

  test('emit change on arrow click', async () => {
    const handleChange = vi.fn()
    const wrapper = mount({
      components: { AmuSwiper, AmuSwiperItem },
      template: `
        <amu-swiper :model-value="0" @change="handleChange">
          <amu-swiper-item>第一页</amu-swiper-item>
          <amu-swiper-item>第二页</amu-swiper-item>
        </amu-swiper>
      `,
      methods: { handleChange }
    })

    await wrapper.find('.amu-swiper__arrow--next').trigger('click')
    expect(handleChange).toHaveBeenCalledWith(1)
  })
})
