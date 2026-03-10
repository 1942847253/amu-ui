import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { AmuPopup } from '../index'

describe('Popup', () => {
  it('inherits dark theme from reference container', async () => {
    mount({
      components: { AmuPopup },
      template: `
        <div data-amu-theme="dark">
          <amu-popup :model-value="true" teleport-to="body">
            <template #reference>
              <button>Trigger</button>
            </template>
            <div>Content</div>
          </amu-popup>
        </div>
      `
    }, {
      attachTo: document.body
    })

    await nextTick()
    await nextTick()

    const popup = document.body.querySelector('.amu-popup')
    expect(popup?.getAttribute('data-amu-theme')).toBe('dark')
  })
})