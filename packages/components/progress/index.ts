import { withInstall } from '@amu-ui/utils'
import Progress from './src/progress.vue'
import './src/style.css'

export const AmuProgress = withInstall(Progress)
export default AmuProgress

export * from './src/props'
