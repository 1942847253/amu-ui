import { withInstallFunction } from '@amu-ui/utils'
import { Message } from './src/method'
import './src/style.css'

export const AmuMessage = withInstallFunction(Message, '$message')
export default AmuMessage

export * from './src/types'
export * from './src/props'
