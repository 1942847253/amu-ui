import { withInstall } from '@amu-ui/utils'
import Pagination from './src/pagination.vue'
import './src/style.css'

export const AmuPagination = withInstall(Pagination)
export default AmuPagination

export * from './src/props'
