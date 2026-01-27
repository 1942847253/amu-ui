import { withInstall, withNoopInstall } from '@amu-ui/utils'
import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'
import './src/style.css'

export const AmuCollapse = withInstall(Collapse, {
  CollapseItem,
})
export const AmuCollapseItem = withNoopInstall(CollapseItem)
export default AmuCollapse

export * from './src/props'
