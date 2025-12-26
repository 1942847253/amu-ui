import { withInstall } from '@amu-ui/utils'
import Slider from './src/slider.vue'
import './src/style.css';

export const AmuSlider = withInstall(Slider)
export default AmuSlider

export * from './src/props'
