import { withInstall } from '@amu-ui/utils'
import Descriptions from './src/descriptions.vue'
import DescriptionsItem from './src/descriptions-item.vue'
export * from './src/props'

export const AmuDescriptions = withInstall(Descriptions)
export const AmuDescriptionsItem = withInstall(DescriptionsItem)
export default AmuDescriptions
