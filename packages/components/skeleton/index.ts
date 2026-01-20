import { withInstall } from '@amu-ui/utils'
import Skeleton from './src/skeleton.vue'
import SkeletonItem from './src/skeleton-item.vue'

export const AmuSkeleton = withInstall(Skeleton)
export const AmuSkeletonItem = withInstall(SkeletonItem)

export default AmuSkeleton
export * from './src/props'
