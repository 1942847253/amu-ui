import { withInstall } from '@amu-ui/utils'
import Popconfirm from './src/popconfirm.vue'
import './src/style.css'

export const AmuPopconfirm = withInstall(Popconfirm)
export default AmuPopconfirm

export * from './src/props'
