import { withInstall } from '@amu-ui/utils'
import Drawer from './src/drawer.vue'
import { Drawer as DrawerMethod } from './src/method'

export const AmuDrawer = withInstall(Drawer)

// 将方法附加到组件以便调用：AmuDrawer.open()
;(AmuDrawer as any).open = DrawerMethod.open

export default AmuDrawer

export * from './src/props'
export const DrawerOpener = DrawerMethod // 如果需要，也可以作为命名导出
