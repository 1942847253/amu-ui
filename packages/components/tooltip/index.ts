import { withInstall } from '@amu-ui/utils'
import Tooltip from './src/tooltip.vue'
import './src/style.css'

export const AmuTooltip = withInstall(Tooltip)
export default AmuTooltip

export * from './src/props'
