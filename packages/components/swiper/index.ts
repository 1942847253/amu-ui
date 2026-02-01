import { withInstall } from '@amu-ui/utils'
import Swiper from './src/swiper.vue'
import SwiperItem from './src/swiper-item.vue'
import './src/style.css'

export const AmuSwiper = withInstall(Swiper)
export const AmuSwiperItem = withInstall(SwiperItem)

export default AmuSwiper

export * from './src/props'
