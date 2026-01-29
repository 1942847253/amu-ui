import { withInstall } from '@amu-ui/utils'
import ImageViewer from './src/image-viewer.vue'
import PreviewImage from './src/preview-image.vue'
import { previewImage } from './src/image-viewer-service'

export const AmuImageViewer = withInstall(ImageViewer)
export const AmuPreviewImage = withInstall(PreviewImage)
export { previewImage }

export * from './src/props'
export default AmuImageViewer
