import { withInstall } from '@amu-ui/utils'
import Loading from './loading'
import { vLoading } from './directive'
import AmuLoadingService from './service'
import type { App } from 'vue'

const _AmuLoading = Loading as any

_AmuLoading.install = (app: App) => {
    app.component(_AmuLoading.name, _AmuLoading)
    app.directive('loading', vLoading)
}

_AmuLoading.directive = vLoading
_AmuLoading.service = AmuLoadingService

export const AmuLoading = withInstall(_AmuLoading)

export const AmuLoadingDirective = vLoading
export const AmuLoadingServiceFn = AmuLoadingService

export default AmuLoading

export * from './props'
export * from './types'
