import { withInstall, withNoopInstall } from '@amu-ui/utils'
import Breadcrumb from './src/breadcrumb.vue'
import BreadcrumbItem from './src/breadcrumb-item.vue'
import './src/style.css'

export const AmuBreadcrumb = withInstall(Breadcrumb, {
  BreadcrumbItem,
})
export const AmuBreadcrumbItem = withNoopInstall(BreadcrumbItem)
export default AmuBreadcrumb

export * from './src/props'
export * from './src/constants'
