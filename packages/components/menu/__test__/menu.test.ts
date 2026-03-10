import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AmuMenu, AmuMenuItem, AmuSubMenu } from '../index'

describe('Menu', () => {
  it('supports elevated surface', () => {
    const wrapper = mount(AmuMenu, {
      props: {
        theme: 'dark',
        surface: 'elevated'
      },
      slots: {
        default: '<amu-menu-item index="/dashboard">Dashboard</amu-menu-item>'
      },
      global: {
        components: {
          AmuMenuItem
        }
      }
    })

    expect(wrapper.classes()).toContain('amu-menu--surface-elevated')
    expect(wrapper.attributes('data-amu-theme')).toBe('dark')
  })

  it('passes surface to nested inline submenus', () => {
    const wrapper = mount(AmuMenu, {
      props: {
        theme: 'dark',
        surface: 'elevated',
        defaultOpenKeys: ['examples']
      },
      slots: {
        default: `
          <amu-sub-menu index="examples" title="Examples">
            <amu-menu-item index="buttons">Buttons</amu-menu-item>
          </amu-sub-menu>
        `
      },
      global: {
        components: {
          AmuSubMenu,
          AmuMenuItem
        }
      }
    })

    const nestedMenu = wrapper.findAll('.amu-menu').find((item) => item.classes().includes('amu-menu--inline'))
    expect(nestedMenu).toBeTruthy()
    expect(nestedMenu?.classes()).toContain('amu-menu--surface-elevated')
  })

  it('keeps parent submenu open when nested submenu is also open', () => {
    const wrapper = mount(AmuMenu, {
      props: {
        defaultOpenKeys: ['examples', 'form']
      },
      slots: {
        default: `
          <amu-sub-menu index="examples" title="Examples">
            <amu-sub-menu index="form" title="Form">
              <amu-menu-item index="buttons">Buttons</amu-menu-item>
            </amu-sub-menu>
          </amu-sub-menu>
        `
      },
      global: {
        components: {
          AmuSubMenu,
          AmuMenuItem
        }
      }
    })

    expect(wrapper.findAll('.amu-sub-menu.is-opened')).toHaveLength(2)
  })

  it('uses independent inline arrow state per submenu level', () => {
    const wrapper = mount(AmuMenu, {
      props: {
        defaultOpenKeys: ['examples']
      },
      slots: {
        default: `
          <amu-sub-menu index="examples" title="Examples">
            <amu-sub-menu index="form" title="Form">
              <amu-menu-item index="buttons">Buttons</amu-menu-item>
            </amu-sub-menu>
          </amu-sub-menu>
        `
      },
      global: {
        components: {
          AmuSubMenu,
          AmuMenuItem
        }
      }
    })

    const arrows = wrapper.findAll('.amu-sub-menu__icon-arrow--inline')
    expect(arrows).toHaveLength(2)
    expect(arrows[0].classes()).toContain('is-opened')
    expect(arrows[1].classes()).not.toContain('is-opened')
  })

  it('renders scrollbar content when scrollable is enabled', () => {
    const wrapper = mount(AmuMenu, {
      props: {
        scrollable: true,
        height: 240
      },
      slots: {
        default: '<amu-menu-item index="/dashboard">Dashboard</amu-menu-item>'
      },
      global: {
        components: {
          AmuMenuItem
        }
      }
    })

    expect(wrapper.find('.amu-menu--scrollable').exists()).toBe(true)
    expect(wrapper.find('.amu-menu__scrollbar').exists()).toBe(true)
    expect(wrapper.find('.amu-menu__content').exists()).toBe(true)
  })
})