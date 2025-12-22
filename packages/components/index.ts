import type { App, Plugin } from 'vue'

import { AmuButton } from './button'
import { AmuIcon } from './icon'
import { AmuConfigProvider } from './config-provider'
import { AmuTag } from './tag'
import { AmuSpace } from './space'
import { AmuLayout, AmuHeader, AmuSider, AmuContent, AmuFooter } from './layout'
import { AmuScrollbar } from './scrollbar'
import { AmuRadio, AmuRadioGroup, AmuRadioButton } from './radio'
import { AmuSelect, AmuOption } from './select'

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

export { AmuLayout, AmuHeader, AmuSider, AmuContent, AmuFooter } from './layout'
export * from './layout'

export { AmuScrollbar } from './scrollbar'
export * from './scrollbar'

export { AmuRadio, AmuRadioGroup, AmuRadioButton } from './radio'
export * from './radio'

export { AmuSelect, AmuOption } from './select'
export * from './select'

const AmuUI: Plugin = {
  install(app: App) {
    app.use(AmuButton)
    app.use(AmuIcon)
    app.use(AmuConfigProvider)
    app.use(AmuTag)
    app.use(AmuSpace)
    app.use(AmuLayout)
    app.use(AmuHeader)
    app.use(AmuSider)
    app.use(AmuContent)
    app.use(AmuFooter)
    app.use(AmuScrollbar)
    app.use(AmuRadio)
    app.use(AmuRadioGroup)
    app.use(AmuRadioButton)
    app.use(AmuSelect)
    app.use(AmuOption)
  },
}

export default AmuUI
