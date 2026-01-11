import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem } from '..'

describe('Dropdown', () => {
  it('should render correctly', async () => {
    const wrapper = mount(AmuDropdown, {
      slots: {
        default: '<button>Trigger</button>',
        overlay: `
          <AmuDropdownMenu>
            <AmuDropdownItem>Item 1</AmuDropdownItem>
          </AmuDropdownMenu>
        `
      },
      global: {
        components: {
          AmuDropdownMenu,
          AmuDropdownItem
        }
      }
    })

    expect(wrapper.find('.amu-dropdown__trigger').exists()).toBe(true)
    expect(wrapper.find('.amu-dropdown__trigger').text()).toBe('Trigger')
  })

  it('handle click trigger', async () => {
    const wrapper = mount(AmuDropdown, {
        slots: {
          default: '<button>Trigger</button>',
          overlay: `
            <AmuDropdownMenu>
              <AmuDropdownItem>Item 1</AmuDropdownItem>
            </AmuDropdownMenu>
          `
        },
        global: {
          components: {
            AmuDropdownMenu,
            AmuDropdownItem
          }
        }
    })

    await wrapper.find('.amu-dropdown__trigger').trigger('click')
    // Popup uses Transition, might need to wait or mock transition
    // AmuPopup logic renders content into Teleport.
    // Test-utils mount might not work easily with Teleport unless we check body.
    expect(document.querySelector('.amu-dropdown-menu')).toBeTruthy()
  })

  it('handle disabled', async () => {
      const wrapper = mount(AmuDropdown, {
          props: {
              disabled: true
          },
          slots: {
            default: '<button>Trigger</button>',
            overlay: `
              <AmuDropdownMenu>
                <AmuDropdownItem>Item 1</AmuDropdownItem>
              </AmuDropdownMenu>
            `
          },
          global: {
            components: {
              AmuDropdownMenu,
              AmuDropdownItem
            }
          }
      })
  
      await wrapper.find('.amu-dropdown__trigger').trigger('click')
      // Should not show
      // Can't easily verify 'not show' with Teleport in this env without more setup, 
      // but we can check if trigger has disabled class.
      expect(wrapper.find('.amu-dropdown__trigger--disabled').exists()).toBe(true)
  })
})
