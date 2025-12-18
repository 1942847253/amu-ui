import { withInstall } from '@amu-ui/utils'
import ConfigProvider from './src/config-provider'

export const AmuConfigProvider = withInstall(ConfigProvider)
export default AmuConfigProvider

export * from './src/config-provider'
export * from './src/props'
