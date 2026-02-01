import { withInstall } from '@amu-ui/utils'
import Cascader from './src/cascader.vue'
import './src/style.css'

export const AmuCascader = withInstall(Cascader)

export * from './src/props'
export default AmuCascader
