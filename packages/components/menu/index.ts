import { withInstall, withInstallFunction } from '@amu-ui/utils'

import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import SubMenu from './src/sub-menu.vue'
import MenuGroup from './src/menu-group.vue'

export const AmuMenu = withInstall(Menu)
export const AmuMenuItem = withInstall(MenuItem)
export const AmuSubMenu = withInstall(SubMenu)
export const AmuMenuGroup = withInstall(MenuGroup)

export * from './src/props'
export * from './src/context'

export default AmuMenu
