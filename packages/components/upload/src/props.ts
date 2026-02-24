import type { ExtractPropTypes, PropType } from 'vue'
import type { UploadFile, UploadHttpRequest, UploadRawFile, UploadUserFile } from './types'

export type UploadListType = 'text' | 'picture' | 'picture-card'

export const uploadProps = {
  /**
   * 请求 URL
   * @en Request URL
   */
  action: {
    type: String,
    default: ''
  },
  /**
   * 设置上传的请求头部
   * @en Set request headers
   */
  headers: {
    type: Object as PropType<Headers | Record<string, any>>,
    default: () => ({})
  },
  /**
   * 设置上传请求方法
   * @en Set request method
   */
  method: {
    type: String,
    default: 'post'
  },
  /**
   * 是否支持多选文件
   * @en Whether to support selecting multiple files
   */
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * 上传时附带的额外参数
   * @en Extra parameters when uploading
   */
  data: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  /**
   * 上传的文件字段名
   * @en Upload file field name
   */
  name: {
    type: String,
    default: 'file'
  },
  /**
   * 支持发送 cookie 凭证信息
   * @en Support sending cookie credentials information
   */
  withCredentials: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示已上传文件列表
   * @en Whether to show the uploaded file list
   */
  showFileList: {
    type: Boolean,
    default: true
  },
  /**
   * 是否启用拖拽上传
   * @en Whether to enable drag and drop upload
   */
  drag: {
    type: Boolean,
    default: false
  },
  /**
   * 接受上传的文件类型
   * @en Accepted upload file types
   */
  accept: {
    type: String,
    default: ''
  },
  /**
   * 上传的文件列表
   * @en Upload file list
   */
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => []
  },
  /**
   * 是否在选取文件后立即进行上传
   * @en Whether to upload immediately after selecting the file
   */
  autoUpload: {
    type: Boolean,
    default: true
  },
  /**
   * 是否禁用
   * @en Whether to disable
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 最大允许上传个数
   * @en Maximum number of uploads allowed
   */
  limit: {
    type: Number,
    default: 0
  },
  /**
   * 覆盖默认的上传行为，可以自定义上传实现
   * @en Override the default upload behavior, you can customize the upload implementation
   */
  httpRequest: {
    type: Function as PropType<UploadHttpRequest>,
    default: undefined
  },
  /**
   * 文件列表的类型
   * @en Type of file list
   */
  listType: {
    type: String as PropType<UploadListType>,
    default: 'text'
  },
  /**
   * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise.reject 则停止上传。
   * @en Hook before uploading the file, the parameter is the file to be uploaded, if return false or Promise.reject, stop uploading.
   */
  beforeUpload: {
    type: Function as PropType<(rawFile: UploadRawFile) => boolean | Promise<any>>,
    default: undefined
  },
  /**
   * 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者 Promise.reject 则停止删除。
   * @en Hook before deleting the file, the parameters are the file to be uploaded and the file list, if return false or Promise.reject, stop deleting.
   */
  beforeRemove: {
    type: Function as PropType<(uploadFile: UploadFile, uploadFiles: UploadFile[]) => boolean | Promise<any>>,
    default: undefined
  },
  /**
   * 成功回调
   * @en Success callback
   */
  onSuccess: {
     type: Function as PropType<(response: any, uploadFile: UploadFile, uploadFiles: UploadFile[]) => void>,
     default: undefined
  },
  /**
   * 失败回调
   * @en Error callback
   */
  onError: {
     type: Function as PropType<(error: Error, uploadFile: UploadFile, uploadFiles: UploadFile[]) => void>,
     default: undefined
  },
  /**
   * 进度回调
   * @en Progress callback
   */
  onProgress: {
     type: Function as PropType<(evt: ProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFile[]) => void>,
     default: undefined
  },
  /**
   * 移除回调
   * @en Remove callback
   */
  onRemove: {
     type: Function as PropType<(uploadFile: UploadFile, uploadFiles: UploadFile[]) => void>,
     default: undefined
  },
  /**
   * 预览回调
   * @en Preview callback
   */
  onPreview: {
     type: Function as PropType<(uploadFile: UploadFile) => void>,
     default: undefined
  },
  /**
   * 超出限制回调
   * @en Exceed callback
   */
  onExceed: {
     type: Function as PropType<(files: File[], uploadFiles: UploadFile[]) => void>,
     default: undefined
  }
} as const

export const uploadEmits = {
  /**
   * @description 文件列表更新
   * @en File list update
   */
  'update:fileList': (fileList: UploadFile[]) => true,
  /**
   * @description 文件状态变化
   * @en File status change
   */
  change: (uploadFile: UploadFile, uploadFiles: UploadFile[]) => true,
  /**
   * @description 上传成功
   * @en Upload success
   */
  success: (response: any, uploadFile: UploadFile, uploadFiles: UploadFile[]) => true,
  /**
   * @description 上传进度
   * @en Upload progress
   */
  progress: (evt: ProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFile[]) => true,
  /**
   * @description 上传失败
   * @en Upload error
   */
  error: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFile[]) => true,
  /**
   * @description 移除文件
   * @en Remove file
   */
  remove: (uploadFile: UploadFile, uploadFiles: UploadFile[]) => true,
  /**
   * @description 预览文件
   * @en Preview file
   */
  preview: (uploadFile: UploadFile) => true,
  /**
   * @description 超出数量限制
   * @en Exceed limit
   */
  exceed: (files: File[], uploadFiles: UploadFile[]) => true,
}

export const uploadSlots = {
  /**
   * @description 默认触发区域插槽
   * @en Default trigger slot
   */
  default: {},
  /**
   * @description 文件列表提示插槽
   * @en Tip slot
   */
  tip: {},
  /**
   * @description 文件项自定义插槽
   * @en File item slot
   */
  file: {},
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
