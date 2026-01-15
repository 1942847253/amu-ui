import { withInstall } from '@amu-ui/utils'

import Form from './src/form.vue'
import FormItem from './src/form-item.vue'
import './src/style.css'

export const AmuForm = withInstall(Form)
export const AmuFormItem = withInstall(FormItem)

export * from './src/types'
export * from './src/constants'
export * from './src/props'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>

export default AmuForm
