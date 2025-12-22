import { withInstall } from '@amu-ui/utils'
import Select from './src/select.vue'
import Option from './src/option.vue'
import './src/style.css'

export const AmuSelect = withInstall(Select)
export const AmuOption = withInstall(Option)

export * from './src/props'
export default AmuSelect
