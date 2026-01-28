export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface UploadRawFile extends File {
  uid: number
}

export interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  response?: any
  uid: number
  url?: string
  raw?: UploadRawFile
}

export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> & Partial<Pick<UploadFile, 'status' | 'uid'>>

export interface UploadAjaxError extends Error {
  name: string
  status: number
  method: string
  url: string
}

export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadRequestOptions {
  action: string
  method: string
  data?: Record<string, any>
  filename: string
  file: UploadRawFile
  headers?: Headers | Record<string, any>
  withCredentials?: boolean
  onProgress: (e: UploadProgressEvent) => void
  onSuccess: (response: any) => void
  onError: (err: UploadAjaxError) => void
}

export type UploadHttpRequest = (options: UploadRequestOptions) => XMLHttpRequest | Promise<any>
