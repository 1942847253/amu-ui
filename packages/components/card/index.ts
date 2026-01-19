import { withInstall } from '@amu-ui/utils'
import Card from './src/card.vue'
import CardGrid from './src/card-grid.vue'
import CardMeta from './src/card-meta.vue'

export const AmuCard = withInstall(Card)
export const AmuCardGrid = withInstall(CardGrid)
export const AmuCardMeta = withInstall(CardMeta)

export default AmuCard
export * from './src/props'
export * from './src/types'
