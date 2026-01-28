import { withInstall } from '@amu-ui/utils'
import Upload from './src/upload.vue'
import './src/style.css'

export const AmuUpload = withInstall(Upload)
export default AmuUpload

export * from './src/types'
export * from './src/props'
