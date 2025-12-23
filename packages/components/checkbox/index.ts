import { withInstall } from '@amu-ui/utils'
import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'

export const AmuCheckbox = withInstall(Checkbox)
export const AmuCheckboxGroup = withInstall(CheckboxGroup)

export default AmuCheckbox

export * from './src/props'
