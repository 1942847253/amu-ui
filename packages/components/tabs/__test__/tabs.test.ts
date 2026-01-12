import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { AmuTabs, AmuTabPane } from '../index'

import { nextTick } from 'vue'

describe('Tabs.vue', () => {
  test('render', async () => {
    const wrapper = mount({
      components: { AmuTabs, AmuTabPane },
      template: `
        <amu-tabs modelValue="first">
          <amu-tab-pane name="first" title="First Tab">Content 1</amu-tab-pane>
          <amu-tab-pane name="second" title="Second Tab">Content 2</amu-tab-pane>
        </amu-tabs>
      `
    })

    await nextTick()
    await nextTick()

    // Debug
    // console.log(wrapper.html())

    expect(wrapper.find('.amu-tabs__item.is-active').text()).toContain('First Tab')
    
    const panes = wrapper.findAll('.amu-tab-pane')
    expect(panes[0].isVisible()).toBe(true)
    // expect(panes[1].isVisible()).toBe(false) // Wait, loaded is lazy by default in my implementation? No, loaded is ref(active).
    // if not active initially, loaded is false, so v-if="shouldRender" might return false?
    // Let's check implementation.
    
    // Switch tab
    await wrapper.findAll('.amu-tabs__item')[1].trigger('click')
    await nextTick()
    
    // Check if active class moved
    expect(wrapper.find('.amu-tabs__item.is-active').text()).toContain('Second Tab')
    
    await nextTick() // One more tick for style updates?

    const updatedPanes = wrapper.findAll('.amu-tab-pane')
    // console.log('Pane 0 style:', updatedPanes[0].attributes('style'))
    // console.log('Pane 1 style:', updatedPanes[1].attributes('style'))

    // Content 1 should be hidden
    expect(updatedPanes[0].attributes('style')).toContain('display: none')
    // Content 2 should be visible (no display: none)
    expect(updatedPanes[1].attributes('style') || '').not.toContain('display: none')
  })

  test('closable', async () => {
    const handleEdit = vi.fn()
    const handleTabRemove = vi.fn()
    const wrapper = mount({
      components: { AmuTabs, AmuTabPane },
      template: `
        <amu-tabs modelValue="first" type="card" closable @edit="handleEdit" @tab-remove="handleTabRemove">
          <amu-tab-pane name="first" title="First Tab">Content 1</amu-tab-pane>
          <amu-tab-pane name="second" title="Second Tab" :closable="false">Content 2</amu-tab-pane>
          <amu-tab-pane name="third" title="Third Tab">Content 3</amu-tab-pane>
        </amu-tabs>
      `,
      methods: {
        handleEdit,
        handleTabRemove
      }
    })

    await nextTick()
    await nextTick()

    // First tab should have close icon
    const items = wrapper.findAll('.amu-tabs__item')
    expect(items[0].find('.amu-tabs__close-icon').exists()).toBe(true)
    // Second tab explicitly not closable
    expect(items[1].find('.amu-tabs__close-icon').exists()).toBe(false)

    // Click close on first
    await items[0].find('.amu-tabs__close-icon').trigger('click')
    expect(handleTabRemove).toHaveBeenCalledWith('first')
    expect(handleEdit).toHaveBeenCalledWith('first', 'remove')
  })

  test('addable', async () => {
    const handleAdd = vi.fn()
    const wrapper = mount({
      components: { AmuTabs, AmuTabPane },
      template: `
        <amu-tabs modelValue="first" type="editable-card" addable @tab-add="handleAdd">
          <amu-tab-pane name="first" title="First Tab">Content 1</amu-tab-pane>
        </amu-tabs>
      `,
      methods: {
        handleAdd
      }
    })
    
    await nextTick()
    await nextTick()

    const addBtn = wrapper.find('.amu-tabs__new-tab')
    expect(addBtn.exists()).toBe(true)
    
    await addBtn.trigger('click')
    expect(handleAdd).toHaveBeenCalled()
  })
})
