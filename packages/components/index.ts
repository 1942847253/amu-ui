import type { App, Plugin } from 'vue'

import { AmuButton } from './button'
import { AmuIcon } from './icon'
import { AmuConfigProvider } from './config-provider'

export { AmuButton } from './button'
export * from './button'

export { AmuIcon } from './icon'
export * from './icon'

export { AmuConfigProvider } from './config-provider'
export * from './config-provider'

const AmuUI: Plugin = {
  install(app: App) {
    app.use(AmuButton)
    app.use(AmuIcon)
    app.use(AmuConfigProvider)
  }
}


export default AmuUI
