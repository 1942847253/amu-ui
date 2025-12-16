import type { App, Plugin } from 'vue'

import { AmuButton } from './button'

export { AmuButton } from './button'
export * from './button'

const AmuUI: Plugin = {
  install(app: App) {
    app.use(AmuButton)
  }
}

export default AmuUI
