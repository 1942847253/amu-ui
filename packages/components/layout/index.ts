import './src/style.css'
import { withInstall } from '@amu-ui/utils'
import Layout from './src/layout.vue'
import Header from './src/header.vue'
import Sider from './src/sider.vue'
import Content from './src/content.vue'
import Footer from './src/footer.vue'

export const AmuLayout = withInstall(Layout)
export const AmuHeader = withInstall(Header)
export const AmuSider = withInstall(Sider)
export const AmuContent = withInstall(Content)
export const AmuFooter = withInstall(Footer)

export default AmuLayout

export * from './src/props'
