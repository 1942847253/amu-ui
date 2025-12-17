import type { App, Plugin } from 'vue'

import { AmuButton } from './button'
import { AmuIcon } from './icon'

export { AmuButton } from './button'
export * from './button'

export { AmuIcon } from './icon'
export * from './icon'

const AmuUI: Plugin = {
  install(app: App) {
    app.use(AmuButton)
    app.use(AmuIcon)
  }
}


export default AmuUI
