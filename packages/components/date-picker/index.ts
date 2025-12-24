import { withInstall } from '@amu-ui/utils'
import DatePicker from './src/date-picker.vue'

import './src/style.css'

export const AmuDatePicker = withInstall(DatePicker)
export default AmuDatePicker

export * from './src/props'
