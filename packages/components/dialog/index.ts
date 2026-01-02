import { withInstall } from '@amu-ui/utils'
import _Dialog from './src/dialog.vue'
import _DialogPlugin from './src/plugin'

export const AmuDialog = withInstall(_Dialog)
export const Dialog = _DialogPlugin

export * from './src/props'
export default AmuDialog
