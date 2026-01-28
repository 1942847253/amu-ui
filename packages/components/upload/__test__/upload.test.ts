import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Upload from '../src/upload.vue'

describe('Upload.vue', () => {
  test('render', () => {
    const wrapper = mount(Upload)
    expect(wrapper.classes()).toContain('amu-upload')
  })

  test('render slots', () => {
      const wrapper = mount(Upload, {
          slots: {
              default: '<span>Trigger</span>',
              tip: '<span>Tip</span>'
          }
      })
      expect(wrapper.text()).toContain('Trigger')
      expect(wrapper.text()).toContain('Tip')
  })
})
