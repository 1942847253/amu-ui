import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { AmuLayout, AmuHeader, AmuSider, AmuContent, AmuFooter } from '../index'

describe('Layout', () => {
  it('renders correctly', () => {
    const wrapper = mount(AmuLayout, {
      slots: {
        default: 'Layout Content'
      }
    })
    expect(wrapper.classes()).toContain('amu-layout')
    expect(wrapper.text()).toBe('Layout Content')
  })

  it('respects direction prop', () => {
    const wrapper = mount(AmuLayout, {
      props: { direction: 'vertical' }
    })
    expect(wrapper.classes()).toContain('amu-layout--vertical')
  })

  it('respects hasSider prop', () => {
    const wrapper = mount(AmuLayout, {
      props: { hasSider: true }
    })
    expect(wrapper.classes()).toContain('amu-layout--has-sider')
  })
})

describe('Header', () => {
  it('renders correctly', () => {
    const wrapper = mount(AmuHeader, {
      slots: {
        default: 'Header Content'
      }
    })
    expect(wrapper.classes()).toContain('amu-layout-header')
    expect(wrapper.text()).toBe('Header Content')
  })

  it('accepts height prop as number', () => {
    const wrapper = mount(AmuHeader, {
      props: { height: 80 }
    })
    expect(wrapper.attributes('style')).toContain('height: 80px')
  })

  it('accepts height prop as string', () => {
    const wrapper = mount(AmuHeader, {
      props: { height: '100px' }
    })
    expect(wrapper.attributes('style')).toContain('height: 100px')
  })
})

describe('Sider', () => {
  it('renders correctly', () => {
    const wrapper = mount(AmuSider, {
      slots: {
        default: 'Sider Content'
      }
    })
    expect(wrapper.classes()).toContain('amu-layout-sider')
    expect(wrapper.text()).toContain('Sider Content')
  })

  it('applies default width', () => {
    const wrapper = mount(AmuSider)
    expect(wrapper.attributes('style')).toContain('200px')
  })

  it('accepts custom width', () => {
    const wrapper = mount(AmuSider, {
      props: { width: 300 }
    })
    expect(wrapper.attributes('style')).toContain('300px')
  })

  it('shows collapsed state', () => {
    const wrapper = mount(AmuSider, {
      props: { collapsed: true, collapsedWidth: 60 }
    })
    expect(wrapper.classes()).toContain('amu-layout-sider--collapsed')
    expect(wrapper.attributes('style')).toContain('60px')
  })

  it('shows trigger when collapsible', () => {
    const wrapper = mount(AmuSider, {
      props: { collapsible: true }
    })
    expect(wrapper.find('.amu-layout-sider__trigger').exists()).toBe(true)
  })

  it('hides trigger when not collapsible', () => {
    const wrapper = mount(AmuSider, {
      props: { collapsible: false }
    })
    expect(wrapper.find('.amu-layout-sider__trigger').exists()).toBe(false)
  })

  it('emits collapse event on trigger click', async () => {
    const wrapper = mount(AmuSider, {
      props: { collapsible: true, defaultCollapsed: false }
    })
    
    await wrapper.find('.amu-layout-sider__trigger').trigger('click')
    
    expect(wrapper.emitted('update:collapsed')).toBeTruthy()
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([true])
    expect(wrapper.emitted('collapse')).toBeTruthy()
    expect(wrapper.emitted('collapse')?.[0]).toEqual([true])
  })

  it('supports left position', () => {
    const wrapper = mount(AmuSider, {
      props: { position: 'left' }
    })
    expect(wrapper.classes()).toContain('amu-layout-sider--left')
  })

  it('supports right position', () => {
    const wrapper = mount(AmuSider, {
      props: { position: 'right' }
    })
    expect(wrapper.classes()).toContain('amu-layout-sider--right')
  })

  it('supports custom trigger slot', () => {
    const wrapper = mount(AmuSider, {
      props: { collapsible: true },
      slots: {
        trigger: 'Custom Trigger'
      }
    })
    expect(wrapper.find('.amu-layout-sider__trigger').text()).toBe('Custom Trigger')
  })
})

describe('Content', () => {
  it('renders correctly', () => {
    const wrapper = mount(AmuContent, {
      slots: {
        default: 'Content Area'
      }
    })
    expect(wrapper.classes()).toContain('amu-layout-content')
    expect(wrapper.text()).toBe('Content Area')
  })
})

describe('Footer', () => {
  it('renders correctly', () => {
    const wrapper = mount(AmuFooter, {
      slots: {
        default: 'Footer Content'
      }
    })
    expect(wrapper.classes()).toContain('amu-layout-footer')
    expect(wrapper.text()).toBe('Footer Content')
  })

  it('accepts height prop as number', () => {
    const wrapper = mount(AmuFooter, {
      props: { height: 80 }
    })
    expect(wrapper.attributes('style')).toContain('height: 80px')
  })

  it('accepts height prop as string', () => {
    const wrapper = mount(AmuFooter, {
      props: { height: '100px' }
    })
    expect(wrapper.attributes('style')).toContain('height: 100px')
  })
})

describe('Layout Composition', () => {
  it('creates classic layout structure', () => {
    const wrapper = mount({
      template: `
        <amu-layout>
          <amu-header>Header</amu-header>
          <amu-content>Content</amu-content>
          <amu-footer>Footer</amu-footer>
        </amu-layout>
      `,
      components: {
        AmuLayout,
        AmuHeader,
        AmuContent,
        AmuFooter
      }
    })
    
    expect(wrapper.find('.amu-layout-header').exists()).toBe(true)
    expect(wrapper.find('.amu-layout-content').exists()).toBe(true)
    expect(wrapper.find('.amu-layout-footer').exists()).toBe(true)
  })

  it('creates layout with sider', () => {
    const wrapper = mount({
      template: `
        <amu-layout>
          <amu-header>Header</amu-header>
          <amu-layout>
            <amu-sider>Sider</amu-sider>
            <amu-content>Content</amu-content>
          </amu-layout>
          <amu-footer>Footer</amu-footer>
        </amu-layout>
      `,
      components: {
        AmuLayout,
        AmuHeader,
        AmuSider,
        AmuContent,
        AmuFooter
      }
    })
    
    expect(wrapper.findAll('.amu-layout').length).toBeGreaterThan(1)
    expect(wrapper.find('.amu-layout-sider').exists()).toBe(true)
  })
})
