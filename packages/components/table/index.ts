import { withInstall } from '@amu-ui/utils'
import Table from './src/table.vue'
import TableColumn from './src/table-column'

export const AmuTable = withInstall(Table)
export const AmuTableColumn = withInstall(TableColumn)

export default AmuTable
export * from './src/props'
