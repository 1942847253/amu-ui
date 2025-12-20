import type { App, Plugin } from 'vue'

import { AmuButton } from './button'
import { AmuIcon } from './icon'
import { AmuConfigProvider } from './config-provider'
import { AmuTag } from './tag'
import { AmuSpace } from './space'

export { AmuButton } from './button'
export * from './button'

export { AmuIcon } from './icon'
export * from './icon'

export { AmuConfigProvider } from './config-provider'
export * from './config-provider'

export { AmuTag } from './tag'
export * from './tag'

export { AmuSpace } from './space'
export * from './space'

const AmuUI: Plugin = {
  install(app: App) {
    app.use(AmuButton)
    app.use(AmuIcon)
    app.use(AmuConfigProvider)
    app.use(AmuTag)
    app.use(AmuSpace)
  }
}

export default AmuUI
