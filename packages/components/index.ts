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
import { AmuInput } from './input'
import { AmuCheckbox, AmuCheckboxGroup } from './checkbox'
import { AmuSwitch } from './switch'
import { AmuDatePicker } from './date-picker'
import { AmuSlider } from './slider'
import { AmuPopup } from './popup'
import { AmuPopconfirm } from './popconfirm'

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

export { AmuInput } from './input'
export * from './input'

export { AmuCheckbox, AmuCheckboxGroup } from './checkbox'
export * from './checkbox'

export { AmuSwitch } from './switch'
export * from './switch'

export { AmuDatePicker } from './date-picker'
export * from './date-picker'

export { AmuSlider } from './slider'
export * from './slider'

export { AmuPopup } from './popup'
export * from './popup'

export { AmuPopconfirm } from './popconfirm'
export * from './popconfirm'

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
    app.use(AmuInput)
    app.use(AmuRadioButton)
    app.use(AmuSelect)
    app.use(AmuOption)
    app.use(AmuCheckbox)
    app.use(AmuCheckboxGroup)
    app.use(AmuSwitch)
    app.use(AmuDatePicker)
    app.use(AmuSlider)
    app.use(AmuPopup)
    app.use(AmuPopconfirm)
  },
}

export default AmuUI
