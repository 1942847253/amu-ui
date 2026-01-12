import { withInstall } from '@amu-ui/utils'
import Tabs from './src/tabs.vue'
import TabPane from './src/tab-pane.vue'

// Import style
import './src/style.css'

export const AmuTabs = withInstall(Tabs)
export const AmuTabPane = withInstall(TabPane)

export default AmuTabs

export * from './src/props'
