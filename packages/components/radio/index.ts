import { withInstall } from '@amu-ui/utils'
import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'
import RadioButton from './src/radio-button.vue'
import './src/style.css'

export const AmuRadio = withInstall(Radio)
export const AmuRadioGroup = withInstall(RadioGroup)
export const AmuRadioButton = withInstall(RadioButton)

export default AmuRadio

export * from './src/props'
