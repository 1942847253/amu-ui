import { withInstall, withNoopInstall } from '@amu-ui/utils'
import type { SFCWithInstall } from '@amu-ui/utils'
import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'
import './src/style.css'

type CollapseWithInstall = SFCWithInstall<typeof Collapse> & {
  CollapseItem: typeof CollapseItem
}

export const AmuCollapse: CollapseWithInstall = withInstall(Collapse, {
  CollapseItem,
})
export const AmuCollapseItem: SFCWithInstall<typeof CollapseItem> = withNoopInstall(CollapseItem)
export default AmuCollapse

export * from './src/props'
