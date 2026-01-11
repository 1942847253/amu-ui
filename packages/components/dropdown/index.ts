// packages/components/dropdown/index.ts
import { withInstall } from '@amu-ui/utils'
import Dropdown from './src/dropdown.vue'
import DropdownMenu from './src/dropdown-menu.vue'
import DropdownItem from './src/dropdown-item.vue'
import './src/style.css'

export const AmuDropdown = withInstall(Dropdown)
export const AmuDropdownMenu = withInstall(DropdownMenu)
export const AmuDropdownItem = withInstall(DropdownItem)

export default AmuDropdown // Default export for AmuUI installer

export * from './src/props'
