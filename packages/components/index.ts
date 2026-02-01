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
import { AmuTextarea } from './textarea'
import { AmuCheckbox, AmuCheckboxGroup } from './checkbox'
import { AmuSwitch } from './switch'
import { AmuDatePicker } from './date-picker'
import { AmuSlider } from './slider'
import { AmuPopup } from './popup'
import { AmuTooltip } from './tooltip'
import { AmuPopconfirm } from './popconfirm'
import { AmuDialog, Dialog } from './dialog'

import { AmuDrawer } from './drawer'
import { AmuMessage } from './message'
import { AmuSpinner } from './spinner'
import { AmuLoading } from './loading'
import { AmuRate } from './rate'
import { AmuInputNumber } from './input-number'
import { AmuTree } from './tree'
import { AmuMenu, AmuMenuItem, AmuSubMenu, AmuMenuGroup } from './menu'
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem } from './dropdown'
import { AmuBreadcrumb, AmuBreadcrumbItem } from './breadcrumb'
import { AmuTabs, AmuTabPane } from './tabs'
import { AmuPagination } from './pagination'
import { AmuTable, AmuTableColumn } from './table'
import { AmuForm, AmuFormItem } from './form'
import { AmuRow } from './row'
import { AmuCol } from './col'
import { AmuCard, AmuCardGrid, AmuCardMeta } from './card'
import { AmuSkeleton, AmuSkeletonItem } from './skeleton'
import { AmuProgress } from './progress'
import { AmuCollapse, AmuCollapseItem } from './collapse'
import { AmuUpload } from './upload'
import { AmuImageViewer, AmuPreviewImage } from './image-viewer'

export { AmuRow } from './row'
export * from './row'

export { AmuCol } from './col'
export * from './col'

export { AmuCard, AmuCardGrid, AmuCardMeta } from './card'
export * from './card'

export { AmuSkeleton, AmuSkeletonItem } from './skeleton'
export * from './skeleton'

export { AmuProgress } from './progress'
export * from './progress'

export { AmuCollapse, AmuCollapseItem } from './collapse'
export * from './collapse'

export { AmuUpload } from './upload'
export * from './upload'

export { AmuImageViewer, AmuPreviewImage } from './image-viewer'
export * from './image-viewer'

export { AmuButton } from './button'
export * from './button'

export { AmuIcon } from './icon'
export * from './icon'

export { AmuSpinner } from './spinner'
export * from './spinner'

export { AmuLoading, AmuLoadingDirective, AmuLoadingServiceFn } from './loading'
export * from './loading'


export { AmuRate } from './rate'
export * from './rate'

export { AmuInputNumber } from './input-number'
export * from './input-number'

export { AmuTree } from './tree'
export * from './tree'

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

export { AmuTextarea } from './textarea'
export * from './textarea'

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

export { AmuTooltip } from './tooltip'
export * from './tooltip'

export { AmuPopconfirm } from './popconfirm'
export * from './popconfirm'

export { AmuDialog, Dialog } from './dialog'
export * from './dialog'

export { AmuDrawer } from './drawer'
export * from './drawer'

export { AmuMessage } from './message'
export * from './message'

export * from './menu'

export * from './dropdown'

export { AmuBreadcrumb, AmuBreadcrumbItem } from './breadcrumb'
export * from './breadcrumb'

export { AmuTabs, AmuTabPane } from './tabs'
export * from './tabs'

export { AmuPagination } from './pagination'
export * from './pagination'

export { AmuForm, AmuFormItem } from './form'
export * from './form'

export { AmuTable, AmuTableColumn } from './table'
export * from './table'

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
    app.use(AmuTextarea)
    app.use(AmuRadioButton)
    app.use(AmuSelect)
    app.use(AmuOption)
    app.use(AmuCheckbox)
    app.use(AmuCheckboxGroup)
    app.use(AmuSwitch)
    app.use(AmuDatePicker)
    app.use(AmuDialog)
    app.use(AmuDrawer)
    app.use(AmuSlider)
    app.use(AmuPopup)
    app.use(AmuTooltip)
    app.use(AmuPopconfirm)
    app.use(AmuMessage)
    app.use(AmuTree)
    app.use(AmuSpinner)
    app.use(AmuLoading)
    app.use(AmuRate)
    app.use(AmuInputNumber)
    app.use(AmuMenu)
    app.use(AmuMenuItem)
    app.use(AmuSubMenu)
    app.use(AmuMenuGroup)
    app.use(AmuTabs)
    app.use(AmuTabPane)
    app.use(AmuDropdown)
    app.use(AmuDropdownMenu)
    app.use(AmuDropdownItem)
    app.use(AmuBreadcrumb)
    app.use(AmuBreadcrumbItem)
    app.use(AmuPagination)
    app.use(AmuTable)
    app.use(AmuTableColumn)
    app.use(AmuRow)
    app.use(AmuCol)
    app.use(AmuCard)
    app.use(AmuCardGrid)
    app.use(AmuProgress)
    app.use(AmuCardMeta)
    app.use(AmuSkeleton)
    app.use(AmuCollapse)
    app.use(AmuCollapseItem)
    app.use(AmuSkeletonItem)
    app.use(AmuForm)
    app.use(AmuFormItem)
    app.use(AmuUpload)
    app.use(AmuImageViewer)
    app.use(AmuPreviewImage)
  },
}


export default AmuUI
