import { withInstall, withNoopInstall } from '@amu-ui/utils'
import type { SFCWithInstall } from '@amu-ui/utils'
import Breadcrumb from './src/breadcrumb.vue'
import BreadcrumbItem from './src/breadcrumb-item.vue'
import './src/style.css'

type BreadcrumbWithInstall = SFCWithInstall<typeof Breadcrumb> & {
  BreadcrumbItem: typeof BreadcrumbItem
}

export const AmuBreadcrumb: BreadcrumbWithInstall = withInstall(Breadcrumb, {
  BreadcrumbItem,
})
export const AmuBreadcrumbItem: SFCWithInstall<typeof BreadcrumbItem> = withNoopInstall(BreadcrumbItem)
export default AmuBreadcrumb

export * from './src/props'
export * from './src/constants'
