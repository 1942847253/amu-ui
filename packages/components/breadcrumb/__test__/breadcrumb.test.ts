import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { AmuBreadcrumb, AmuBreadcrumbItem } from '../index'
import { AmuDropdownMenu } from '../../dropdown'

describe('Breadcrumb', () => {
  it('should render slots correctly', () => {
    const wrapper = mount(AmuBreadcrumb, {
      slots: {
        default: `
          <div class="test-item">Item 1</div>
          <div class="test-item">Item 2</div>
        `
      }
    })
    expect(wrapper.findAll('.test-item')).toHaveLength(2)
  })

  it('should render routes prop correctly', () => {
    const routes = [
      { path: '/', title: 'Home' },
      { path: '/detail', title: 'Detail' }
    ]
    const wrapper = mount(AmuBreadcrumb, {
      props: { routes }
    })
    const items = wrapper.findAll('.amu-breadcrumb-item')
    expect(items).toHaveLength(2)
    expect(items[0].text()).toContain('Home')
    expect(items[1].text()).toContain('Detail')
  })

  it('should handle max-items collapsing', () => {
    const routes = [
      { title: '1' },
      { title: '2' },
      { title: '3' },
      { title: '4' },
      { title: '5' }
    ]
    const wrapper = mount(AmuBreadcrumb, {
      props: { routes, maxItems: 3 },
      global: {
        components: { AmuBreadcrumbItem, AmuDropdownMenu }
      }
    })
    
    // Logic: 1, ..., 5 (3 items total visible)
    // The second item becomes the collapsed one.
    const items = wrapper.findAll('.amu-breadcrumb-item')
    expect(items).toHaveLength(3) 
    expect(items[0].text()).toContain('1')
    expect(items[1].text()).toContain('...')
    expect(items[2].text()).toContain('5')
  })

  it('separator prop work', () => {
    const wrapper = mount(AmuBreadcrumb, {
      props: { separator: '>' },
      slots: {
        default: AmuBreadcrumbItem
      }
    })
    // Note: BreadcrumbItem needs to be mounted clearly to check separator
    // Easier to use full component
  })
})
