import { describe, expect, it } from 'vitest'
import { createApp, defineComponent } from 'vue'

import { withInstall } from '../withInstall'

describe('withInstall', () => {
  it('registers component via app.use()', () => {
    const Comp = defineComponent({
      name: 'AmuX',
      template: '<div />'
    })

    const Installed = withInstall(Comp)
    const app = createApp({ render: () => null })
    app.use(Installed)

    expect((app as any)._context.components.AmuX).toBeTruthy()
  })
})
